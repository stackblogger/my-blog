import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserRepository, UserRepository } from '../repositories/user.repository';

export interface IUserService {
  findOne(id: string): Promise<User>;
  upsert(user: User): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(UserRepository) private readonly user: IUserRepository) {}

  async findOne(id: string): Promise<User> {
    return await this.user.findOne(id);
  }

  async upsert(user: User): Promise<User> {
    return await this.user.upsert(user);
  }
}
