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
}

export type UpdateJobDto = Partial<CreateJobDto>;
