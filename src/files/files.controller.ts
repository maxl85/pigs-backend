import { Controller, Get, Post, Response, Param, UseInterceptors, UploadedFile, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { fileStorage } from './storage';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { CreateFileDto } from './dto/create-file.dto';


@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
  
  // @Post('upload')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // uploadFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
  //   return this.filesService.saveFiles(file, userId);
  // }
  
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  uploadFile(@Body() dto: CreateFileDto, @UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
    return this.filesService.saveFiles(dto.camId, dto.dateTime, file, userId);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@UserId() userId: number) {
    return this.filesService.findAll(userId);
  }
  
  @Get(':path')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './uploads' });
  }

}
