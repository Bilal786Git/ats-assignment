"use client";

import { Badge } from "@ats/components/ui/Badge/Badge";
import type { JobStatus } from "@ats/types";
import { JOB_STATUS_LABELS } from "@ats/types";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return <Badge variant={status}>{JOB_STATUS_LABELS[status]}</Badge>;
}
