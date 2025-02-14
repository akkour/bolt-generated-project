import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStyles from "./tailwind.css?url";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import { auth } from "./lib/api/auth";
import { getSession } from "./lib/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { 
    rel: "stylesheet", 
    href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap"
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get('userId');
  const user = userId ? await auth.getCurrentUser() : null;

  return {
    user,
  };
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50 flex flex-col">
        <Header currentUser={user} />
        <main className="flex-grow pt-16"> {/* Added pt-16 to account for fixed header */}
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
