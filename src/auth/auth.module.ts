import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    // JWTを使うための設定
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // envファイルから秘密鍵を渡す
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            //　有効期間を設定
            expiresIn: '1200s',
          },
        };
      },
      inject: [ConfigService], // useFactoryで使うためにConfigServiceを注入する
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
