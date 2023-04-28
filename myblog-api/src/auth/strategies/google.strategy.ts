import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import getServerConfig from '../../config/configurations/server.config';
import { Profile } from 'passport';
import { SocialUserModel } from '../models/social-user.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: getServerConfig().google.clientId,
      clientSecret: getServerConfig().google.clientSecret,
      callbackURL: `http://${getServerConfig().host}:${getServerConfig().port}/auth/google/redirect`,
      scope: ['email', 'profile']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { name, emails } = profile;
    const user: SocialUserModel = {
      email: emails[0].value,
      accessToken,
      name: name.givenName + ' ' + name.familyName
    };
    done(null, user);
  }
}
