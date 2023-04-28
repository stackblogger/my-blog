import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { mock, when } from 'ts-mockito';
import { ConfigModule } from '@nestjs/config';
import getServerConfig from '../../config/configurations/server.config';
import { User } from '../../user/models/user.model';

describe('AuthService', () => {
  const accessToken = 'some jwt access token';
  let service: AuthService;
  let mockedJwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({})],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => accessToken)
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeAll(() => {
    mockedJwtService = mock<JwtService>();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleLogin', () => {
    it('should generate access token after auth', () => {
      const payload = { email: 'jameer@test.com ', _id: '644af9095fabb9e3d0d76f54' };
      when(
        mockedJwtService.sign({ email: payload.email, sub: payload._id }, { secret: getServerConfig().jwtSecretKey })
      ).thenReturn(accessToken);
      const response = service.handleLogin(payload as User);
      expect(response).toEqual(accessToken);
    });
  });
});
