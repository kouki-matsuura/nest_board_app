import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a user', () => {
      const dto: CreateUserDto = {
        name: '太郎',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async (dto: CreateUserDto) => {
          const user: User = {
            id: 1,
            ...dto,
          };
          return user;
        });

      expect(controller.create(dto)).resolves.toEqual({
        id: 1,
        ...dto,
      });
    });
  });

  describe('findAll()', () => {
    it('should return users', () => {
      const user: User = {
        id: 1,
        name: '太郎',
      };

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return [user];
      });

      expect(controller.findAll()).resolves.toEqual([user]);
    });

    it('should return empty array by Not found users', () => {
      const user: User[] = [];

      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return user;
      });

      expect(controller.findAll()).resolves.toEqual(user);
    });
  });

  describe('findOne()', () => {
    it('should return user', () => {
      const user: User = {
        id: 1,
        name: '太郎',
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        return user;
      });

      expect(controller.findOne(1)).resolves.toEqual(user);
    });

    it('should return not found exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue({
        statusCode: 404,
        message: 'Not Found',
      });

      expect(controller.findOne(2)).rejects.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
