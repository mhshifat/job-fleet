"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { redirect } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants";

export default function Protected({ children }: PropsWithChildren) {
  const { user } = useAuth();
  
  if (!user) return redirect(ROUTE_PATHS.LOGIN);
  return (
    <>
      {children}
    </>
  )
}