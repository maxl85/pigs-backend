import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @IsString()
  @ApiProperty({ default: 'cam1' })
  camId: string;
  
  @ApiProperty({ default: new Date() })
  dateTime: Date;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  file: Express.Multer.File;
}
