import { Injectable } from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './dto/jobs.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJobDto) {
    try {
      const slug = randomUUID();
      return this.prisma.job.create({
        data: {
          ...dto,
          slug,
        },
      });
    } catch (error) {
      console.error('Error creating job:', error);
      throw new Error('Error creating job');
    }
  }

  async findAll(userId?: string, status?: string) {
    const statusFilter = status ? status.toUpperCase() : undefined;
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
    console.log('dto:', dto);
    return this.prisma.job.update({
      where: { id },
      data: Object.fromEntries(
        Object.entries(dto)
          .filter(([, value]) => value !== undefined)
          .map(([key, val]) => {
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
