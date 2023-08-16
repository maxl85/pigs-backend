import { ApiProperty } from '@nestjs/swagger';

export class CreateOnlineDto {
  @ApiProperty({ default: 'rpi01' })
  rpiId: string;
  
  @ApiProperty()
  counter: number;
}

