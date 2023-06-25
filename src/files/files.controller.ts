import { Controller, Get, Post, Response, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { fileStorage } from './storage';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';


@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
  
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File, @UserId() userId: number) {
    return this.filesService.saveFiles(file, userId);
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
