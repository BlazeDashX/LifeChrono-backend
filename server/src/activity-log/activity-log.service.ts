import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateActivityLogDto) {
    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    if (end <= start) {
      throw new BadRequestException('End time must be after start time');
    }

    // 🔎 Check for overlapping logs for this user
    const overlap = await this.prisma.activityLog.findFirst({
      where: {
        userId: dto.userId,
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start },
          },
        ],
      },
    });

    if (overlap) {
      throw new BadRequestException('This time overlaps with an existing log.');
    }

    // ✅ Ensure the category exists
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException('Invalid category ID.');
    }

    // 🧩 Create the activity log
    return this.prisma.activityLog.create({
      data: {
        userId: dto.userId,
        categoryId: dto.categoryId,
        startTime: start,
        endTime: end,
        notes: dto.notes || '',
      },
      include: { category: true },
    });
  }

  findAll(userId?: string) {
    return this.prisma.activityLog.findMany({
      where: userId ? { userId } : {},
      include: { category: true },
      orderBy: { startTime: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.activityLog.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: string, dto: UpdateActivityLogDto) {
    return this.prisma.activityLog.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  remove(id: string) {
    return this.prisma.activityLog.delete({ where: { id } });
  }
}
