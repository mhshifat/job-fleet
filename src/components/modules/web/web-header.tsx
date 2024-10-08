"use client";

import { useAuth } from "@/components/providers/auth";
import Logo from "@/components/shared/logo";
import { ROUTE_PATHS } from "@/utils/constants";
import { StepForwardIcon } from "lucide-react";
import Link from "next/link";

export default function WebHeader() {
  const { authState } = useAuth();

  return (
    <div className="p-3 flex items-center gap-5 border-b border-border/50">
      <Logo className="h-[25px]" />

      <nav className="flex items-center gap-2 ml-auto">
        {authState?.uid && (
          <Link href={ROUTE_PATHS.DASHBOARD} className="text-base font-geist font-medium text-foreground/90 leading-[1] flex items-center gap-2">
            <span className="tracking-tighter">Dashboard</span>
            <StepForwardIcon className="size-4" />
          </Link>
        )}
        {!authState?.uid && (
          <>
            <Link href={ROUTE_PATHS.LOGIN} className="text-base font-geist font-medium text-foreground/90 leading-[1] flex items-center gap-2">
              <span className="tracking-tighter">Login / Register</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}