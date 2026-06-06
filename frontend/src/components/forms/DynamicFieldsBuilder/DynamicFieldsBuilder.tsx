"use client";

import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { Select } from "@ats/components/ui/Select/Select";
import { toast } from "@ats/components/ui/Toast/Toast";
import type { CustomField, CustomFieldType } from "@ats/types";
import styles from "./DynamicFieldsBuilder.module.less";

interface DynamicFieldsBuilderProps {
  fields: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

const fieldTypeOptions = [
  { value: "text", label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "file", label: "File Upload" },
];

export function DynamicFieldsBuilder({
  fields,
  onChange,
}: DynamicFieldsBuilderProps) {
  const addField = () => {
    const newField: CustomField = {
      id: crypto.randomUUID(),
      label: "",
      type: "text",
      required: false,
    };
    onChange([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onChange(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    if (fields.length <= 1) {
      toast("error", "At least one field must remain");
      return;
    }
    onChange(fields.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>Custom Questions</p>
          <p className={styles.subtitle}>
            Add custom fields to the application form
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addField}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Question
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className={styles.empty}>No custom questions added yet.</p>
      ) : (
        fields.map((field) => (
          <div key={field.id} className={styles.fieldRow}>
            <div style={{ paddingTop: 8, color: "#9ca3af" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/></svg>
            </div>
            <div className={styles.fieldInputs}>
              <Input
                placeholder="Question label"
                value={field.label}
                onChange={(e) =>
                  updateField(field.id, { label: e.target.value })
                }
              />
              <Select
                options={fieldTypeOptions}
                value={field.type}
                onChange={(e) =>
                  updateField(field.id, {
                    type: e.target.value as CustomFieldType,
                  })
                }
              />
            </div>
            <div className={styles.fieldActions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, { required: e.target.checked })
                  }
                />
                Required
              </label>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeField(field.id)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
