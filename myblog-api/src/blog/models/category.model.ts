import { Document } from 'mongoose';

export interface Category extends Document {
  readonly name: string;
  readonly slug: string;
  readonly timestamp: Date;
}
