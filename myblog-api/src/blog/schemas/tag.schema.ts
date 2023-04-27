import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  slug: { type: String, required: [true, 'Slug is required'], index: true },
  timestamp: { type: Date }
});
