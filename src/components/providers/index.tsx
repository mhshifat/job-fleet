"use client";

import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import AuthProvider from "./auth";
import DialogProvider from "./dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <DialogProvider>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </DialogProvider>
    </QueryClientProvider>
  )
}