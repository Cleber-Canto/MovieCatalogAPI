import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user1', description: 'Username of the user' })
    @IsString()
    username!: string;

  @ApiProperty({ example: 'password1', description: 'Password of the user' })
    @IsString()
    password!: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'user1', description: 'Username of the user' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username!: string;

  @ApiProperty({ example: 'password1', description: 'Password of the user' })
    @IsString()
    @MinLength(6)
    password!: string;
}
