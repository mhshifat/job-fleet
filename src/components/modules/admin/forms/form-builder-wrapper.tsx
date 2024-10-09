"use client";

import { useParams } from "next/navigation";
import FormBuilder from "./form-builder";
import FormBuilderProvider from "./form-builder-provider";

export default function FormBuilderWrapper() {
  const { id } = useParams();

  return (
    <FormBuilderProvider>
      <FormBuilder formId={id as string} />
    </FormBuilderProvider>
  )
}