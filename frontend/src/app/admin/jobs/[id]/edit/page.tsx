"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobForm } from "@ats/components/jobs/JobForm/JobForm";
import { Skeleton } from "@ats/components/ui/Skeleton/Skeleton";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const { request, loading, data: job } = useApi<Job>();

  useEffect(() => {
    if (params.id) {
      request("GET", `/jobs/${params.id}`).catch(() => {});
    }
  }, [params.id, request]);

  if (loading) {
    return (
      <div style={{ maxWidth: 800 }}>
        <Skeleton height={32} width={200} />
        <div style={{ marginTop: 8 }}>
          <Skeleton height={16} width={300} />
        </div>
        <div
          style={{
            marginTop: 24,
            background: "white",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 24,
          }}
        >
          <Skeleton height={20} width={120} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 16,
            }}
          >
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <p style={{ color: "#6b7280" }}>Job not found</p>
        <button
          onClick={() => router.push("/admin/jobs")}
          style={{
            marginTop: 16,
            color: "#2563eb",
            fontSize: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to jobs
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
          Edit Job
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
          Update the details for {job.title}
        </p>
      </div>
      <JobForm initialData={job} />
    </div>
  );
}
