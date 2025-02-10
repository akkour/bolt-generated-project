import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation, redirect } from "@remix-run/react";
import { auth } from "~/lib/api/auth";
import { useState, useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up - PennFix" },
    { name: "description", content: "Create an account on PennFix" }
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const accountType = formData.get("accountType") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Server-side password strength validation
  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" };
  }

  try {
    await auth.signUp(email, password, accountType);
    return redirect("/login"); // Redirect to login page after signup
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export default function SignUp() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [accountType, setAccountType] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(actionData || {});
  }, [actionData]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to an existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="mt-1">
                <select
                  id="accountType"
                  name="accountType"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => {
                    setAccountType(e.target.value);
                  }}
                  value={accountType}
                >
                  <option value="">Select Account Type</option>
                  <option value="homeowner">Customer Account</option>
                  <option value="provider">Service Provider Account</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={!accountType}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled={!accountType}
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
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            {errors?.error && (
              <div className="text-red-500 text-sm text-center">
                {errors.error}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
