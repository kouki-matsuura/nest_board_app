import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

type PasswordOmitUser = Omit<User, 'password'>;
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略
  @Post('login')
  async login(@Request() req: { user: PasswordOmitUser }) {
    // LocalStrategy.validate()で認証して返した値がreq.userに入る
    const user = req.user;

    // JwtTokenを返す
    return this.authService.login(user);
  }

  /**
   * @description JWT認証を用いたサンプルAPI
  */
  @UseGuards(AuthGuard('jwt')) // passport-jwt戦略
  @Get('profile')
  getProfile(@Request() req: { user: PasswordOmitUser }) {
    // JwtStrategy.validate()で認証して返した値がreq.userに入る
    const user = req.user;

    // 認証に成功したユーザの情報を返す
    return user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
