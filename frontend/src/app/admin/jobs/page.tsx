"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { Select } from "@ats/components/ui/Select/Select";
import { Modal } from "@ats/components/ui/Modal/Modal";
import { JobTable } from "@ats/components/jobs/JobTable/JobTable";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";

export default function AdminJobsPage() {
  const router = useRouter();
  const { request, loading } = useApi<Job[]>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    request("GET", `/jobs?${params.toString()}`)
      .then(setJobs)
      .catch(() => {});
  }, [search, statusFilter, request]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await request("DELETE", `/jobs/${deleteTarget.id}`);
      setDeleteTarget(null);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      request("GET", `/jobs?${params.toString()}`)
        .then(setJobs)
        .catch(() => {});
    } catch {
      alert("Failed to delete job");
    }
  };

  const handleRefresh = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    request("GET", `/jobs?${params.toString()}`)
      .then(setJobs)
      .catch(() => {});
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>
            Jobs
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
            Manage your job postings
          </p>
        </div>
        <Button onClick={() => router.push("/admin/jobs/create")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Job
        </Button>
      </div>

      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRefresh()}
          />
        </div>
        <Select
          options={[
            { value: "", label: "All Statuses" },
            { value: "draft", label: "Draft" },
            { value: "pending", label: "Pending" },
            { value: "live", label: "Live" },
            { value: "closed", label: "Closed" },
          ]}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 160 }}
        />
        <Button variant="secondary" onClick={handleRefresh}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </Button>
      </div>

      <JobTable
        jobs={jobs}
        loading={loading}
        onDelete={(job) => setDeleteTarget(job)}
        onRefresh={handleRefresh}
      />

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Job"
      >
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>
          ? This action cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
