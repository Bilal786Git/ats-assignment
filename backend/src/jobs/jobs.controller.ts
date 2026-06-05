import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateJobDto } from './dto/jobs.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/middleware/context.middleware';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
  }

  @Get()
  findAll(@Query() query: { status?: string }, @Req() req: RequestWithUser) {
    return this.jobsService.findAll(req.user?.userId, query.status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.jobsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    console.log('dto:', dto);
    return this.jobsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
