import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../models/tag.model';

export interface ITagRepository {
  create(tag: Tag): Promise<Tag>;
}

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(tag: Tag): Promise<Tag> {
    const createdTag = new this.tagModel(tag);
    return await createdTag.save();
  }
}
