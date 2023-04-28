import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title us required'] },
  slug: { type: String, required: [true, 'Slug is required'], index: true },
  body: { type: String },
  author: {
    required: [true, 'Author is required.'],
    type: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Author _id is required'],
        index: true
      },
      name: { type: String, required: [true, 'Author name is required.'] }
    }
  },
  tags: {
    default: [],
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tags' },
        name: { type: String, index: true },
        slug: { type: String }
      }
    ]
  },
  category: {
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
      name: { type: String, index: true },
      slug: { type: String }
    }
  },
  timestamp: { type: Date, required: true, index: true }
});
