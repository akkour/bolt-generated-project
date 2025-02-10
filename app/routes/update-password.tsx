import { useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  redirect,
  useSearchParams,
} from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { supabase } from "~/lib/supabase/client";

export const meta: MetaFunction = () => {
  return [{ title: "Update Password - PennFix" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const token_hash = new URL(request.url).searchParams.get("token_hash") as string;
  const type = new URL(request.url).searchParams.get("type") as string;

  if (!password) {
    return { success: false, error: "Password is required" };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" };
  }

  try {
    const { error } = await supabase.auth.updateUser({ password, token_hash, type });

    if (error) {
      throw error;
    }

    return redirect("/login");
  } catch (error) {
    console.error("Update password error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export default function UpdatePassword() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!token_hash || !type) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-red-500 text-sm text-center">
              Invalid password reset link.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </div>

            {actionData?.error && (
              <div className="text-red-500 text-sm text-center">
                {actionData.error}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
