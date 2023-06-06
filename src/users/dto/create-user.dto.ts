import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
