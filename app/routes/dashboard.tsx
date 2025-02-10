import { useEffect } from "react";
import {
  useLoaderData,
  redirect,
  useNavigate,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { auth } from "~/lib/api/auth";
import type { Database } from "~/lib/supabase/types";
import { CustomerDashboard } from "~/components/dashboard/CustomerDashboard";
import { ProviderDashboard } from "~/components/dashboard/ProviderDashboard";
import { AdminDashboard } from "~/components/dashboard/AdminDashboard";

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
      case "admin":
        return <AdminDashboard user={user} profile={profile} />;
      case "customer":
        return <CustomerDashboard user={user} profile={profile} />;
      case "provider":
        return <ProviderDashboard user={user} profile={profile} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="container-custom min-h-screen bg-gray-100 py-10">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Welcome to your Dashboard, {user.email}
        </h1>
        {renderDashboard()}
      </div>
    </div>
  );
}
