/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

function safeHydrate(callback: () => void) {
  try {
    startTransition(() => {
      callback();
    });
  } catch (error) {
    // Handle the error here.  You might want to log it or display a user-friendly message.
    console.error("Hydration failed:", error);
  }
}

safeHydrate(() => {
  hydrateRoot(
    document,
    <RemixBrowser />
  );
});
