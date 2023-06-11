import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
  @Length(8, 40)
  @IsNotEmpty()
  password: string;
}
