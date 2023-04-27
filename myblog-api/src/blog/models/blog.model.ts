import { Document } from 'mongoose';
import { Category } from './category.model';
import { Tag } from './tag.model';

export interface Blog extends Document {
  readonly title: string;
  slug: string;
  readonly body: string;
  author: {
    name: string;
  };
  tags: Tag[];
  category: Category;
  timestamp: Date;
}
