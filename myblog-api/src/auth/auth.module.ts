import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule {}
