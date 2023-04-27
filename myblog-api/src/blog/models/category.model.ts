import { Document } from 'mongoose';

export interface Category extends Document {
  readonly name: string;
  slug: string;
  timestamp: Date;
}
