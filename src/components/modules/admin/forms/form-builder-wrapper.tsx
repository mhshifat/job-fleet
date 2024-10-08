"use client";

import FormBuilder from "./form-builder";
import FormBuilderProvider from "./form-builder-provider";

export default function FormBuilderWrapper() {
  return (
    <FormBuilderProvider>
      <FormBuilder />
    </FormBuilderProvider>
  )
}