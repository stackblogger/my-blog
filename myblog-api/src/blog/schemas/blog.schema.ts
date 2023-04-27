import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title us required'] },
  slug: { type: String, required: [true, 'Slug is required'] },
  body: { type: String },
  author: {
    required: [true, 'Author is required.'],
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: [true, 'Author _id is required'] },
      name: { type: String, required: [true, 'Author name is required.'] }
    }
  },
  tags: {
    default: [],
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tags' },
        name: { type: String },
        slug: { type: String }
      }
    ]
  },
  category: {
    type: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
      name: { type: String },
      slug: { type: String }
    }
  },
  timestamp: { type: Date, required: true }
});
