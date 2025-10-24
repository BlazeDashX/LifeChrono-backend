/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityLogDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
