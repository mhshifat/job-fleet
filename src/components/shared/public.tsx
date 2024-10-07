"use client";

import React, { useLayoutEffect } from "react";
import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { ROUTE_PATHS } from "@/utils/constants";
import { redirect } from "next/navigation";

export default function Public({ children }: PropsWithChildren) {
  const { authState } = useAuth();

  useLayoutEffect(() => {
    if (authState?.uid) return redirect(ROUTE_PATHS.HOME);
  }, [authState?.uid])
  
  return (
    <>
      {children}
    </>
  )
}