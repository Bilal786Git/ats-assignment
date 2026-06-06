import { Controller, Post, Body } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post('create')
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }
}
