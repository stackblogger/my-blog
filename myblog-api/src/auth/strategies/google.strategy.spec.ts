import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';

describe('GoogleStrategy', () => {
  let service: GoogleStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({})],
      providers: [GoogleStrategy]
    }).compile();

    service = module.get<GoogleStrategy>(GoogleStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should format data and move to next middleware', async () => {
      await service.validate(
        'some-token',
        '',
        {
          name: { givenName: 'Jameer', familyName: 'Khan' },
          emails: [{ value: 'jameer@test.com' }],
          provider: 'Google',
          id: 'some-id',
          displayName: 'Jameer'
        },
        jest.fn
      );
    });
  });
});
