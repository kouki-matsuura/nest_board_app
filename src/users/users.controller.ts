import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
@Resolver((of) => User)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(+id);
  }

  @Mutation(() => User)
  create(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Mutation(() => User)
  update(
    @Args('id') id: number,
    @Args('createUserDto') createUserDto: CreateUserDto,
  ) {
    return this.usersService.update(+id, createUserDto);
  }

  @Mutation(() => User)
  remove(@Args('id') id: number) {
    return this.usersService.remove(+id);
  }
}
