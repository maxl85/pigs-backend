import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UserId } from '../decorators/user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('doors')
@UseGuards(JwtAuthGuard)
@ApiTags('doors')
@ApiBearerAuth()
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  create(@Body() dto: CreateDoorDto, @UserId() userId: number) {
    return this.doorsService.create(dto, userId);
  }

  @Get()
  findAll(@UserId() userId: number) {
    return this.doorsService.findAll(userId);
  }

  
}
