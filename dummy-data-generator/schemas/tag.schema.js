const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  slug: { type: String, required: [true, 'Slug is required'], index: true },
  timestamp: { type: Date }
})

module.exports = mongoose.model('Tag', TagSchema)
