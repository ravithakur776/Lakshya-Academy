"use client";

import { Toaster } from "@/components/ui/sonner";

/**
 * Toast Provider
 *
 * Renders the Sonner toast container at the root level.
 * Toast notifications can be triggered using:
 *   import { toast } from "sonner"
 *   toast.success("Enrollment confirmed!")
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: "font-sans",
          title: "font-semibold",
        },
      }}
    />
  );
}
