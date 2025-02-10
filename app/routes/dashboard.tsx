import { useEffect, useState } from "react";
import {
  useLoaderData,
  redirect,
  useNavigate,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { auth } from "~/lib/api/auth";
import { supabase } from "~/lib/supabase/client";
import type { Database } from "~/lib/supabase/types";
import { CustomerDashboard } from "~/components/dashboard/CustomerDashboard";
import { ProviderDashboard } from "~/components/dashboard/ProviderDashboard";
import { CustomerProfileForm } from "~/components/profile/CustomerProfileForm";
import { ProviderProfileForm } from "~/components/profile/ProviderProfileForm";

type Profile = Database['public']['Tables']['profiles']['Row'];

type LoaderData = {
  user: {
    id: string;
    email: string | null;
  } | null;
  profile: Profile | null;
};

export const loader: LoaderFunctionArgs = async ({ request }) => {
  const { user, profile, error } = await auth.getCurrentProfile();

  if (!user) {
    return redirect("/login");
  }

  return { user: { id: user.id, email: user.email }, profile };
};

export default function Dashboard() {
  const { user, profile } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const renderDashboard = () => {
    switch (profile?.role) {
      case "customer":
        return <CustomerDashboard user={user} profile={profile} />;
      case "provider":
        return <ProviderDashboard user={user} profile={profile} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  const renderProfileForm = () => {
    switch (profile?.role) {
      case "customer":
        return <CustomerProfileForm user={user} profile={profile} />;
      case "provider":
        return <ProviderProfileForm user={user} profile={profile} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome to your Dashboard, {user.email}
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {renderDashboard()}
                {renderProfileForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
