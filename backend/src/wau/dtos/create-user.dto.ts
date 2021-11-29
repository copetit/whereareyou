import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: '12345678',
  })
  Password: string;
  @ApiProperty({
    default: 'eevee@thunder.com',
  })
  MailAddress: string;
}
