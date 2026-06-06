import type {
  JobType,
  JobStatus,
  LocationType as JobLocationType,
} from '../../../generated/prisma';

export interface CreateJobDto {
  title: string;
  description: string;
  payStartRange: number;
  payEndRange: number;
  location: string;
  jobType: JobType;
  status: JobStatus;
  locationType: JobLocationType;
  resumeRequired?: boolean;
  coverRequired?: boolean;
}

export type UpdateJobDto = Partial<CreateJobDto>;

export interface FindAllJobsDto {
  search?: string;
  type?: string;
  userId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}
