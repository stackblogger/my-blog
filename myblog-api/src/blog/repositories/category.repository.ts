import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../models/category.model';

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
}

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async create(category: Category): Promise<Category> {
    return this.categoryModel.findOneAndUpdate({ name: category.name }, category, { upsert: true }).exec();
  }
}
