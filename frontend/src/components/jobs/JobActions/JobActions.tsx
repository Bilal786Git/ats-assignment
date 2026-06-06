"use client";

import type { Job, JobStatus } from "@ats/types";
import { JOB_STATUS_FLOW, JOB_STATUS_LABELS } from "@ats/types";
import apiClient from "@ats/lib/apiClient";
import { toast } from "@ats/components/ui/Toast/Toast";

interface JobActionsProps {
  job: Job;
  onEdit: (id: string) => void;
  onDelete: (job: Job) => void;
  onStatusChange: () => void;
}

export function JobActions({
  job,
  onEdit,
  onDelete,
  onStatusChange,
}: JobActionsProps) {
  const nextStatuses = JOB_STATUS_FLOW[job.status] || [];

  const handleStatusChange = async (newStatus: JobStatus) => {
    try {
      await apiClient.patch(`/jobs/${job.id}`, { status: newStatus });
      toast("success", `Job moved to ${JOB_STATUS_LABELS[newStatus]}`);
      onStatusChange();
    } catch {
      toast("error", "Failed to change status");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(job.id);
        }}
        title="Edit"
        style={{
          padding: 6,
          border: "none",
          background: "transparent",
          color: "#9ca3af",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#eff6ff";
          e.currentTarget.style.color = "#2563eb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#9ca3af";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>

      {nextStatuses.map((nextStatus) => (
        <button
          key={nextStatus}
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(nextStatus);
          }}
          title={`Move to ${JOB_STATUS_LABELS[nextStatus]}`}
          style={{
            padding: "4px 8px",
            border: "1px solid #e5e7eb",
            background: "transparent",
            color: "#6b7280",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 11,
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#eff6ff";
            e.currentTarget.style.color = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#6b7280";
          }}
        >
          {JOB_STATUS_LABELS[nextStatus]}
        </button>
      ))}

      {job.status === "live" && (
        <a
          href={`/jobs/${job.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="View public"
          style={{
            padding: 6,
            border: "none",
            background: "transparent",
            color: "#9ca3af",
            borderRadius: 6,
            cursor: "pointer",
            display: "inline-flex",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f0fdf4";
            e.currentTarget.style.color = "#16a34a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#9ca3af";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(job);
        }}
        title="Delete"
        style={{
          padding: 6,
          border: "none",
          background: "transparent",
          color: "#9ca3af",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#fef2f2";
          e.currentTarget.style.color = "#dc2626";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#9ca3af";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
      </button>
    </div>
  );
}
