"use client";

import React, { useLayoutEffect } from "react";
import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { redirect } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants";

export default function Protected({ children }: PropsWithChildren) {
  const { authState } = useAuth();

  useLayoutEffect(() => {
    if (!authState?.uid) return redirect(ROUTE_PATHS.LOGIN);
  }, [authState?.uid])
  
  return (
    <>
      {children}
    </>
  )
}