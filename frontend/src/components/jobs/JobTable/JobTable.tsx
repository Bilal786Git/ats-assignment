"use client";

import { useRouter } from "next/navigation";
import { Table, type Column } from "@ats/components/ui/Table/Table";
import { JobStatusBadge } from "@ats/components/jobs/JobStatusBadge/JobStatusBadge";
import { JobActions } from "@ats/components/jobs/JobActions/JobActions";
import { formatCurrency, formatDate } from "@ats/lib/utils";
import { JOB_TYPE_LABELS, LOCATION_TYPE_LABELS } from "@ats/types";
import type { Job } from "@ats/types";

interface JobTableProps {
  jobs: Job[];
  loading: boolean;
  onDelete: (job: Job) => void;
  onRefresh: () => void;
}

function toJob(item: Record<string, unknown>): Job {
  return item as unknown as Job;
}

export function JobTable({
  jobs,
  loading,
  onDelete,
  onRefresh,
}: JobTableProps) {
  const router = useRouter();

  console.log("JOBS:", jobs);

  const columns: Column[] = [
    { key: "title", header: "Job Title" },
    {
      key: "status",
      header: "Status",
      render: (item) => <JobStatusBadge status={toJob(item).status} />,
    },
    {
      key: "jobType",
      header: "Type",
      render: (item) => JOB_TYPE_LABELS[toJob(item).jobType],
    },
    {
      key: "locationType",
      header: "Location",
      render: (item) => LOCATION_TYPE_LABELS[toJob(item).locationType],
    },
    {
      key: "payStartRange",
      header: "Pay Range",
      render: (item) => {
        const j = toJob(item);
        return `${formatCurrency(j.payStartRange)} - ${formatCurrency(j.payEndRange)}`;
      },
    },
    {
      key: "createdAt",
      header: "Created",
      render: (item) => formatDate(toJob(item).createdAt),
    },
    {
      key: "actions",
      header: "",
      width: "200px",
      render: (item) => {
        const job = toJob(item);
        return (
          <JobActions
            job={job}
            onEdit={(id) => router.push(`/admin/jobs/${id}/edit`)}
            onDelete={onDelete}
            onStatusChange={onRefresh}
          />
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={jobs as unknown as Record<string, unknown>[]}
      loading={loading}
      emptyMessage="No jobs found. Create your first job posting!"
    />
  );
}
