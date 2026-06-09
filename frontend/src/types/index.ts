export type JobStatus = "draft" | "pending" | "live" | "closed";
export type JobType = "full-time" | "part-time" | "internship";
export type JobLocationType = "remote" | "on-site" | "hybrid";
export type CustomFieldType = "text" | "textarea" | "file";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface CustomField {
  id: string;
  label: string;
  type: CustomFieldType;
  required: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  payStartRange: number;
  payEndRange: number;
  location: string;
  jobType: JobType;
  locationType: JobLocationType;
  status: JobStatus;
  slug: string;
  resumeRequired?: boolean;
  coverRequired?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  payStartRange: number;
  payEndRange: number;
  location: string;
  jobType: JobType;
  locationType: JobLocationType;
  status: JobStatus;
}

export interface ApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  coverLetter?: string;
  resume?: File;
  customResponses?: Record<string, string>;
}

export const JOB_STATUS_FLOW: Record<JobStatus, JobStatus[]> = {
  draft: ["pending"],
  pending: ["live"],
  live: ["closed"],
  closed: [],
};

export const JOB_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  PENDING: "Pending",
  LIVE: "Live",
  CLOSED: "Closed",
};

export const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  INTERNSHIP: "Internship",
};

export const LOCATION_TYPE_LABELS: Record<string, string> = {
  REMOTE: "Remote",
  ON_SITE: "On-site",
  HYBRID: "Hybrid",
};
