import { ApiProperty } from '@nestjs/swagger';

export class CreateDoorDto {
  @ApiProperty({ default: 'door1' })
  doorId: string;

  @ApiProperty({ default: new Date() })
  openedAt: Date;
  
  @ApiProperty({ default: new Date() })
  closedAt: Date;
}
