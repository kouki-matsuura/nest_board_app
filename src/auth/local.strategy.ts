import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseLocalStrategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

type PasswordOmitUser = Omit<User, 'password'>;
/**
 * @description userNameとpasswordを使った認証処理を行うクラス
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // passport-localはデフォルトでuserNameとpasswordをパラメータを受け取る
  async validate(
    id: User['id'],
    pass: User['password'],
  ): Promise<PasswordOmitUser> {
    // 認証して結果を受け取る
    const user = await this.authService.validateUser(id, pass);

    if (!user) {
      throw new UnauthorizedException(); // 認証の失敗
    }

    return user;
  }
}
