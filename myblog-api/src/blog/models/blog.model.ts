import { Document } from 'mongoose';

export interface Blog extends Document {
  readonly title: string;
  readonly slug: string;
  readonly body: string;
  readonly author: {
    name: string;
  };
  readonly tags: {
    name: string;
    slug: string;
  }[];
  readonly category: {
    name: string;
    slug: string;
  };
  readonly timestamp: Date;
}
