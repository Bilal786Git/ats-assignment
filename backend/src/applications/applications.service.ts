import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateApplicationDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.prisma.application.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        resume: dto.resume ?? '',
        coverLetter: dto.coverLetter,
        job: {
          connect: { id: dto.jobId },
        },
      },
    });
  }
}
