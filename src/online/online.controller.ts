import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { OnlineService } from './online.service';
import { UserId } from '../decorators/user-id.decorator';
import { CreateOnlineDto } from './dto/create-online.dto';

@Controller('online')
@UseGuards(JwtAuthGuard)
@ApiTags('online')
@ApiBearerAuth()
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) {}

  @Post()
  create(@Body() dto: CreateOnlineDto, @UserId() userId: number) {
    return this.onlineService.create(dto, userId);
  }

  @Get()
  findLast(@Query('rpiId') rpiId: string, @Query('last') last: number) {
    return this.onlineService.findLast(rpiId, last);
  }

}
