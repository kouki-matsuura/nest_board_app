import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ name, password }: CreateUserDto): Promise<User> {
    return await this.userRepository
      .save({
        name: name,
        password: password,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}]:ユーザーの登録に失敗しました。`,
        );
      });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find().catch((e) => {
      throw new InternalServerErrorException(
        `[${e.message}]:ユーザーの取得に失敗しました。`,
      );
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository
      .findOne({
        where: { id: id },
      })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.userRepository
      .findOne({ where: { name: name } })
      .then((res) => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUserDto.name;
    user.password = updateUserDto.password;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.delete(user);
  }
}
