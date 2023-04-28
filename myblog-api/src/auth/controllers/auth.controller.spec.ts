import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';
import { mock, when } from 'ts-mockito';
import { User } from 'src/user/models/user.model';
import { ConfigModule } from '@nestjs/config';
import getServerConfig from '../../config/configurations/server.config';

const authorId = '644af9095fabb9e3d0d76f54';
const user = { name: 'Jameer', _id: authorId };
const accessToken = 'some jwt access token';

describe('AuthController', () => {
  let controller: AuthController;
  let mockedUserService: UserService;
  let mockedAuthService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({})],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            handleLogin: jest.fn().mockImplementation(() => accessToken)
          }
        },
        {
          provide: UserService,
          useValue: {
            upsert: jest.fn().mockImplementation(() => Promise.resolve(user))
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  beforeAll(() => {
    mockedUserService = mock<UserService>();
    mockedAuthService = mock<AuthService>();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should should be defined', () => {
    expect(controller.googleAuth).toBeDefined();
  });

  it('should make a dummy call', () => {
    controller.googleAuth();
  });

  describe('googleAuthRedirect', () => {
    it('should generate after-auth url with access token for ui', async () => {
      when(mockedUserService.upsert(user as User)).thenResolve(user as User);
      const userResponse = await mockedUserService.upsert(user as User);
      when(mockedAuthService.handleLogin(userResponse)).thenReturn(accessToken);

      const response = await controller.googleAuthRedirect({ user });
      const urlToRedirect = `${getServerConfig().frontEndCallbackUrl}?token=${accessToken}`;
      expect(response).toHaveProperty('url', urlToRedirect);
    });
  });
});
