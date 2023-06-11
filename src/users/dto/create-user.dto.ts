import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
  @Field()
  @Length(8, 40)
  @IsNotEmpty()
  password: string;
}
