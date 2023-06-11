import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // Payloadを使ったバリデーション処理を実行
  // PayloadはAuthService.login()で定義した値
  async validate(payload: JWTPayload): Promise<JWTPayload> {
    return { userId: payload.userId, userName: payload.userName };
  }
}
// JwtについているPayload情報の型
interface JWTPayload {
  userId: User['id'];
  userName: User['name'];
}

