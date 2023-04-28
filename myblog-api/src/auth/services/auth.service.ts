import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getServerConfig from '../../config/configurations/server.config';
import { User } from '../../user/models/user.model';

export interface IAuthService {
  handleLogin(user: User): string;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  handleLogin(user: User): string {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload, { secret: getServerConfig().jwtSecretKey });
  }
}
