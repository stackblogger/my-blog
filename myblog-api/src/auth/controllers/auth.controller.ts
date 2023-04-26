import { Controller, Get, Inject, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { IUserService, UserService } from 'src/user/services/user.service';
import getServerConfig from 'src/config/configurations/server.config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserService) private readonly userService: IUserService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('Redirecting user to Google');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect(getServerConfig().frontEndCallbackUrl)
  async googleAuthRedirect(@Req() req) {
    await this.userService.upsert(req.user);
    this.authService.googleLogin(req);
    return { url: `${getServerConfig().frontEndCallbackUrl}?token=${req.user.accessToken}` };
  }
}
