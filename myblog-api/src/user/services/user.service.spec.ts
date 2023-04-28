import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { mock, when } from 'ts-mockito';

const authorId = '644af9095fabb9e3d0d76f54';
const user = { name: 'Jameer', _id: authorId } as User;

describe('UserService', () => {
  let service: UserService;
  let mockedUserRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockImplementation(() => Promise.resolve(user)),
            upsert: jest.fn().mockImplementation(() => Promise.resolve(user))
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    mockedUserRepo = mock<UserRepository>();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should get a single blog', async () => {
      when(mockedUserRepo.findOne(user._id)).thenResolve(user);

      const response = await service.findOne(user._id);
      expect(response).toMatchObject(user);
    });
  });

  describe('create', () => {
    it('should upsert an user', async () => {
      when(mockedUserRepo.upsert(user)).thenResolve(user);

      const response = await service.upsert(user);
      expect(response).toMatchObject(user);
    });
  });
});
