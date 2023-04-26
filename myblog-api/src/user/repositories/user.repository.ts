import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

export interface IUserRepository {
  findOne(id: string): Promise<User>;
  upsert(user: User): Promise<User>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async upsert(user: User): Promise<User> {
    return await this.userModel.findOneAndUpdate({ email: user.email }, user, { upsert: true }).exec();
  }
}
