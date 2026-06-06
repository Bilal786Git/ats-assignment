"use client";

import { Input } from "@ats/components/ui/Input/Input";
import { TextArea } from "@ats/components/ui/TextArea/TextArea";
import type { CustomField } from "@ats/types";

interface DynamicFormRendererProps {
  fields: CustomField[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

export function DynamicFormRenderer({
  fields,
  values,
  errors,
  onChange,
}: DynamicFormRendererProps) {
  if (fields.length === 0) return null;

  return (
    <>
      {fields.map((field) => (
        <div key={field.id}>
          {field.type === "textarea" ? (
            <TextArea
              label={`${field.label}${field.required ? " *" : ""}`}
              value={values[field.id] || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              error={errors[field.id]}
            />
          ) : (
            <Input
              label={`${field.label}${field.required ? " *" : ""}`}
              value={values[field.id] || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              error={errors[field.id]}
            />
          )}
        </div>
      ))}
    </>
  );
}
