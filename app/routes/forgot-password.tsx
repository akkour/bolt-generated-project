import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { auth } from "~/lib/api/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Forgot Password - PennFix" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  try {
    await auth.resetPassword(email);
    return { success: true, message: "Password reset link sent to your email" };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export default function ForgotPassword() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [emailSent, setEmailSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {emailSent ? (
            <div className="text-green-500 text-sm text-center">
              Password reset link has been sent to your email address.
            </div>
          ) : (
            <Form method="post" className="space-y-6" onChange={() => setEmailSent(false)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
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
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </div>

              {actionData?.error && (
                <div className="text-red-500 text-sm text-center">
                  {actionData.error}
                </div>
              )}
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
