import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
@ApiTags('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  create(@Body() createDoorDto: CreateDoorDto) {
    return this.doorsService.create(createDoorDto);
  }

  @Get()
  findAll() {
    return this.doorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoorDto: UpdateDoorDto) {
    return this.doorsService.update(+id, updateDoorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doorsService.remove(+id);
  }
}
