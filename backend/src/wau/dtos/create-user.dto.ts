import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: '12345678',
  })
  Password: string;

  @IsEmail()
  @ApiProperty({
    default: 'eevee@thunder.com',
  })
  MailAddress: string;
}
