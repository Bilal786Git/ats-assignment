"use client";

import { Toggle } from "@ats/components/ui/Toggle/Toggle";

interface FormFieldToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function FormFieldToggle({
  label,
  description,
  checked,
  onChange,
}: FormFieldToggleProps) {
  return (
    <Toggle
      label={label}
      description={description}
      checked={checked}
      onChange={onChange}
    />
  );
}
