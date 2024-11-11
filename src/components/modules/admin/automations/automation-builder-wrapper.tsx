"use client";

import { useParams } from "next/navigation";
import AutomationBuilderProvider from "./automation-builder-provider";
import AutomationBuilder from "./automation-builder";

export default function AutomationBuilderWrapper() {
  const { id } = useParams();

  return (
    <AutomationBuilderProvider>
      <AutomationBuilder automationId={id as string} />
    </AutomationBuilderProvider>
  )
}