import { Controller, Get, Post, Response, Param, UseInterceptors, UploadedFile, UseGuards, Body, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
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
  
  // http://127.0.0.1:7777/api/files/dates?cam1=cam1_1&cam2=cam1_2'
  @Get('/dates')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'cam2',  example: 'cam1_2', required: false })
  @ApiQuery({ name: 'cam1', example: 'cam1_1', required: false })
  findAllDates(@Query('cam1') cam1: string, @Query('cam2') cam2: string) {
    return this.filesService.findAllDates(cam1, cam2);
  }
  
  // http://127.0.0.1:7777/api/files/between?cam1=cam1_1&cam2=cam1_2&date1=2023-09-01&date2=2023-09-02
  @Get('/between')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'cam2',  example: 'cam1_2', required: false })
  @ApiQuery({ name: 'cam1', example: 'cam1_1', required: false })
  @ApiQuery({ name: 'date2',  example: '2023-09-02', required: false })
  @ApiQuery({ name: 'date1', example: '2023-09-01', required: false })
  findBetweenDates(
    @Query('cam1') cam1: string,
    @Query('cam2') cam2: string,
    @Query('date1') date1: string,
    @Query('date2') date2: string) {
      return this.filesService.findBetweenDates(cam1, cam2, date1, date2);
  }
  
  @Get(':path')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './uploads' });
  }

}
