"use client";

import Link from "next/link";
import { Badge } from "@ats/components/ui/Badge/Badge";
import { formatCurrency } from "@ats/lib/utils";
import { JOB_TYPE_LABELS, LOCATION_TYPE_LABELS } from "@ats/types";
import type { Job } from "@ats/types";
import styles from "./JobCard.module.less";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.slug}`} className={styles.card}>
      <div className={styles.iconBox}>
        <svg
          width="24"
          height="24"
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
      <h3 className={styles.title}>{job.title}</h3>
      <p className={styles.description}>{job.description}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={styles.metaIcon}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </span>
        <span className={styles.metaItem}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={styles.metaIcon}
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          {formatCurrency(job.payStartRange)} -{" "}
          {formatCurrency(job.payEndRange)}
        </span>
        <span className={styles.metaItem}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={styles.metaIcon}
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {JOB_TYPE_LABELS[job.jobType]}
        </span>
      </div>
      <div className={styles.tags}>
        <Badge variant="live">{JOB_TYPE_LABELS[job.jobType]}</Badge>
        <Badge variant="live">{LOCATION_TYPE_LABELS[job.locationType]}</Badge>
      </div>
    </Link>
  );
}
