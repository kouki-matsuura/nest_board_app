import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, MaxLength } from 'class-validator';
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
  @MaxLength(191)
  name: string;
}
