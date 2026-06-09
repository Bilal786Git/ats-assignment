"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { PublicHeader } from "@ats/components/layout/PublicHeader/PublicHeader";
import { Badge } from "@ats/components/ui/Badge/Badge";
import { Button } from "@ats/components/ui/Button/Button";
import { Skeleton } from "@ats/components/ui/Skeleton/Skeleton";
import { JobApplyForm } from "@ats/components/forms/JobApplyForm/JobApplyForm";
import { useApi } from "@ats/hooks/useApi";
import { formatCurrency } from "@ats/lib/utils";
import { JOB_TYPE_LABELS, LOCATION_TYPE_LABELS } from "@ats/types";
import type { Job } from "@ats/types";

export default function PublicJobDetailPage() {
  const params = useParams();
  const { request, loading } = useApi<Job>();
  const [job, setJob] = useState<Job | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (params.slug) {
      request("GET", `/jobs/slug/${params.slug}`)
        .then(setJob)
        .catch(() => {});
    }
  }, [params.slug, request]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <PublicHeader />
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Skeleton height={40} width="70%" />
          <Skeleton height={16} width="40%" />
          <Skeleton height={120} />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <PublicHeader />
        <div style={{ textAlign: "center", padding: 80 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Job Not Found
          </h2>
          <p style={{ color: "#6b7280", marginBottom: 16 }}>
            This position may no longer be available.
          </p>
          <Link href="/jobs" style={{ color: "#2563eb", fontSize: 14 }}>
            View all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <PublicHeader />

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
        <Link
          href="/jobs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#6b7280",
            marginBottom: 20,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to all jobs
        </Link>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid #e5e7eb",
            padding: 32,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                background: "#eff6ff",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563eb",
                flexShrink: 0,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" />
                <path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" />
                <path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
                {job.title}
              </h1>
              <p style={{ color: "#6b7280", marginTop: 4 }}>{job.location}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              {formatCurrency(job.payStartRange)} -{" "}
              {formatCurrency(job.payEndRange)}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {JOB_TYPE_LABELS[job.jobType]}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {LOCATION_TYPE_LABELS[job.locationType]}
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            <Badge variant="live">{JOB_TYPE_LABELS[job.jobType]}</Badge>
            <Badge variant="live">
              {LOCATION_TYPE_LABELS[job.locationType]}
            </Badge>
          </div>

          <div
            style={{
              whiteSpace: "pre-wrap",
              fontSize: 14,
              lineHeight: 1.7,
              color: "#374151",
            }}
          >
            {job.description}
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              marginTop: 32,
              paddingTop: 24,
            }}
          >
            {!applying ? (
              <Button
                size="large"
                type="primary"
                onClick={() => setApplying(true)}
              >
                Apply for this Job
              </Button>
            ) : (
              <JobApplyForm
                job={job}
                onSuccess={() => setApplying(false)}
                onCancel={() => setApplying(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
