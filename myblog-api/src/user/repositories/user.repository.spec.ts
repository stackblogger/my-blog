import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { Model, Query } from 'mongoose';
import { User } from '../models/user.model';

const authorId = '644af9095fabb9e3d0d76f54';
const user = { name: 'Jameer', _id: authorId } as User;

describe('UserRepository', () => {
  let service: UserRepository;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken('User'),
          useValue: {
            findOneAndUpdate: jest.fn(),
            findById: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<UserRepository>(UserRepository);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return single user', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(user)
    } as unknown as Query<User, User>);
    const response = await service.findOne(user._id);
    expect(response).toMatchObject(user);
  });

  it('should update an user successfully', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(user)
    } as unknown as Query<User, User>);
    const updated = await service.upsert(user);
    expect(updated).toMatchObject(user);
  });
});
