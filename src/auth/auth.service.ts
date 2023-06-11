import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt'; 

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  userName: User['name'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // ユーザーの認証
  async validateUser(
    id: User['id'],
    pass: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findOne(id);

    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  // jwtTokenを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるPayload情報
    const payload: JWTPayload = { userName: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
