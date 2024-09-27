"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  const router = useRouter();
  
  useLayoutEffect(() => {
    router.replace(to);
  }, [to]);

  return null;
}