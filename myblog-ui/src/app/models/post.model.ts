import { Category } from './category.model';
import { Tag } from './tag.model';

export interface BlogModel {
  title: string;
  readonly slug: string;
  body: string;
  readonly author: {
    name: string;
  };
  tags: Tag[];
  category: Category;
  readonly timestamp: Date;
}
