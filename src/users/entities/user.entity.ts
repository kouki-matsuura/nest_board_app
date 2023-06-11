import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  isNotEmpty,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ comment: 'アカウントID' })
  @Field(() => ID)
  @IsNumber()
  readonly id: number;

  @Column('varchar', { comment: 'アカウント名' })
  @Field()
  @MaxLength(30, { message: '名前は30文字以下で設定してください' })
  @IsNotEmpty()
  name: string;

  @Column('varchar', { comment: 'パスワード' })
  @Field()
  @Length(8, 40, {
    message: 'パスワードは8文字以上40文字以内で設定してください',
  })
  @IsNotEmpty()
  password: string;
}


