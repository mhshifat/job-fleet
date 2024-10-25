"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "../providers/auth";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants";
import Unauthorized from "./unauthorized";

export default function CanAccess({ children, hideContent }: PropsWithChildren<{ hideContent?: boolean }>) {
  const pathname = usePathname();
  const { authState } = useAuth();

  const adminRoutes = [
    ROUTE_PATHS.DASHBOARD_FORMS,
    ROUTE_PATHS.DASHBOARD_FORM_CREATE,
    ROUTE_PATHS.DASHBOARD_JOBS,
    ROUTE_PATHS.DASHBOARD_JOB_CREATE,
    ROUTE_PATHS.DASHBOARD_SETTINGS,
  ];

  if (adminRoutes.includes(pathname) && !authState?.oid) return hideContent ? null : (
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