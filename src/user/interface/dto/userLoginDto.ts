import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The subject identifier from the authentication provider',
    required: false,
  })
  @IsOptional()
  @IsString()
  sub?: string | null;

  @ApiProperty({
    example: 'google',
    description: 'The provider used for authentication',
    required: false,
  })
  @IsOptional()
  @IsString()
  provider?: string;
}
