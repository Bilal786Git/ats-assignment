"use client";

import { JobForm } from "@ats/components/jobs/JobForm/JobForm";

export default function CreateJobPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Create Job
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Fill in the details below to create a new job posting
        </p>
      </div>
      <JobForm />
    </div>
  );
}
