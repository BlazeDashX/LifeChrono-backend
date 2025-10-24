import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  create(@Body() dto: CreateActivityLogDto) {
    return this.activityLogService.create(dto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.activityLogService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityLogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateActivityLogDto) {
    return this.activityLogService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityLogService.remove(id);
  }
}
