"use client";

import React, { useLayoutEffect } from "react";
import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { ROUTE_PATHS } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function Public({ children }: PropsWithChildren) {
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (user?.id) return redirect(ROUTE_PATHS.HOME);
  }, [user?.id])
  
  return (
    <>
      {children}
    </>
  )
}