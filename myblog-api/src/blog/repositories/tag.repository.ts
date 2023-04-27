import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../models/tag.model';

export interface ITagRepository {
  create(tags: Tag[]): Promise<Tag[]>;
}

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(tags: Tag[]): Promise<Tag[]> {
    await this.tagModel.bulkWrite(
      tags.map((tag) => ({
        updateOne: {
          filter: { name: tag.name },
          update: { $set: tag },
          upsert: true
        }
      }))
    );

    return await this.tagModel.find({ name: { $in: tags.map((t) => t.name) } });
  }
}
