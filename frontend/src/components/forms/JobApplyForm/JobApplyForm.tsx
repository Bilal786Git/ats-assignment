"use client";

import { useState } from "react";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { TextArea } from "@ats/components/ui/TextArea/TextArea";
import { FileUploadField } from "@ats/components/forms/FileUploadField/FileUploadField";
import { DynamicFormRenderer } from "@ats/components/forms/DynamicFormRenderer/DynamicFormRenderer";
import { useApi } from "@ats/hooks/useApi";
import { toast } from "@ats/components/ui/Toast/Toast";
import type { Job } from "@ats/types";
import styles from "./JobApplyForm.module.less";

interface JobApplyFormProps {
  job: Job;
  onSuccess: () => void;
  onCancel: () => void;
}

export function JobApplyForm({ job, onSuccess, onCancel }: JobApplyFormProps) {
  const { request, loading } = useApi();
  const config = job.formConfig;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email";
    if (config?.coverLetterEnabled && !coverLetter.trim())
      errs.coverLetter = "Cover letter is required";
    if (config?.resumeRequired && !resume) errs.resume = "Resume is required";
    config?.customFields.forEach((f) => {
      if (f.required && !customValues[f.id]?.trim())
        errs[f.id] = `${f.label} is required`;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("name", name);
      formData.append("email", email);
      if (coverLetter) formData.append("coverLetter", coverLetter);
      if (resume) formData.append("resume", resume);
      formData.append("customResponses", JSON.stringify(customValues));

      await request("POST", "/applications/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("success", "Application submitted successfully!");
      onSuccess();
    } catch {
      toast("error", "Failed to submit application");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
        Apply Now
      </h3>

      <div className={styles.grid}>
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="john@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>

      {config?.coverLetterEnabled && (
        <TextArea
          label="Cover Letter"
          placeholder="Tell us why you're a great fit..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          error={errors.coverLetter}
        />
      )}

      {config?.resumeRequired && (
        <FileUploadField
          label="Resume / CV"
          error={errors.resume}
          onChange={(f) => setResume(f)}
        />
      )}

      {config?.customFields && (
        <DynamicFormRenderer
          fields={config.customFields}
          values={customValues}
          errors={errors}
          onChange={(id, val) =>
            setCustomValues((prev) => ({ ...prev, [id]: val }))
          }
        />
      )}

      <div className={styles.actions}>
        <Button type="submit" loading={loading}>
          Submit Application
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
