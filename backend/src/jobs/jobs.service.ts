import { Injectable } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './dto/jobs.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import type {
  JobType,
  LocationType as JobLocationType,
  JobStatus as JobStatusType,
} from '../../generated/prisma';

const jobTypesMap: Record<string, JobType> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  internship: 'INTERNSHIP',
};

const locationTypesMap: Record<string, JobLocationType> = {
  remote: 'REMOTE',
  'on-site': 'ONSITE',
  hybrid: 'HYBRID',
};

const jobStatusMap: Record<string, JobStatusType> = {
  draft: 'DRAFT',
  pending: 'PENDING',
  live: 'LIVE',
  closed: 'CLOSED',
};

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJobDto) {
    try {
      const slug = randomUUID();

      return this.prisma.job.create({
        data: {
          ...dto,
          jobType: jobTypesMap[dto.jobType],
          locationType: locationTypesMap[dto.locationType],
          applicationFields: {},
          slug,
        },
      });
    } catch (error) {
      console.error('Error creating job:', error);
      throw new Error('Error creating job');
    }
  }

  async findAll(userId?: string, status?: string) {
    const statusFilter = status
      ? (status.toUpperCase() as 'DRAFT' | 'PENDING' | 'LIVE' | 'CLOSED')
      : undefined;
    const where: Record<string, unknown> = {};

    if (statusFilter) {
      where.status = statusFilter;
    } else if (!userId) {
      where.status = 'LIVE';
    }

    return this.prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) throw new Error('Job not found');

    return job;
  }

  async findBySlug(slug: string) {
    const job = await this.prisma.job.findUnique({
      where: { slug },
    });

    if (!job) throw new Error('Job not found');

    return job;
  }

  async update(id: string, dto: UpdateJobDto) {
    await this.findOne(id);
    return this.prisma.job.update({
      where: { id },
      data: Object.fromEntries(
        Object.entries(dto)
          .filter(([key, value]) => value !== undefined && key !== 'formConfig')
          .map(([key, val]) => {
            if (typeof val === 'string' && key === 'jobType') {
              return [key, { set: jobTypesMap[val] }];
            } else if (typeof val === 'string' && key === 'locationType') {
              return [key, { set: locationTypesMap[val] }];
            } else if (typeof val === 'string' && key === 'status') {
              return [key, { set: jobStatusMap[val] }];
            }
            return [key, { set: val }];
          }),
      ),
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.job.delete({
      where: { id },
    });
  }
}
