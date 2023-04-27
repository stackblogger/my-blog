import { Document } from 'mongoose';

export interface Tag extends Document {
  readonly name: string;
  readonly slug: string;
  readonly timestamp: Date;
}
