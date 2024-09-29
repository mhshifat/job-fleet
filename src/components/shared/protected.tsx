"use client";

import React, { useLayoutEffect } from "react";
import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { redirect } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants";

export default function Protected({ children }: PropsWithChildren) {
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (!user?.id) return redirect(ROUTE_PATHS.LOGIN);
  }, [user?.id])
  
  return (
    <>
      {children}
    </>
  )
}