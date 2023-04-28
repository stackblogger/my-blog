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
});
