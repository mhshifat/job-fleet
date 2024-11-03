"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import Unauthorized from "./unauthorized";

export default function CanAccess({ children, hideContent, authProperties }: PropsWithChildren<{ hideContent?: boolean, authProperties: string[] }>) {
  const { authState } = useAuth();

  if (!authProperties.every(item => authState?.[item as keyof typeof authState])) return hideContent ? null : (
    <div className="flex-1">
      <Unauthorized />
    </div>
  )
  return (
    <>
      {children}
    </>
  )
}