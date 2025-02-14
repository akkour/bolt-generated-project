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
  console.log("dashboard.tsx: loader - Dashboard loader started");
  const { user, profile, error } = await auth.getCurrentProfile();
  console.log("dashboard.tsx: loader - auth.getCurrentProfile result:", { user, profile, error });

  if (error) {
    console.error("dashboard.tsx: loader - Error from getCurrentProfile:", error);
  }

  if (!user) {
    console.log("dashboard.tsx: loader - No user found in getCurrentProfile, redirecting to /login");
    return redirect("/login");
  }

  console.log("dashboard.tsx: loader - User found:", user);
  console.log("dashboard.tsx: loader - Profile:", profile);
  return { user: { id: user.id, email: user.email }, profile };
};

export default function Dashboard() {
  const { user, profile } = useLoaderData<typeof loader>();
  console.log("dashboard.tsx:Dashboard - Dashboard component rendering, user:", user, "profile:", profile); // Add log in Dashboard component
  const navigate = useNavigate();

  useEffect(() => {
    console.log("dashboard.tsx: useEffect - useEffect hook in Dashboard component");
    if (!user) {
      console.log("dashboard.tsx: useEffect - No user, navigating to /login");
      navigate("/login");
    } else {
      console.log("dashboard.tsx: useEffect - User exists, dashboard rendering");
    }
  }, [user, navigate]);

  if (!user) {
    console.log("dashboard.tsx: Component - No user, returning null");
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

  console.log("dashboard.tsx: Component - Rendering Dashboard for role:", profile?.role);
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
