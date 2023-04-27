const mongoose = require('mongoose')
const { generateTitle, generateBody, generateCategory, generateTag, convertToSlug, randomString } = require('./helper')
const blogModel = require('./schemas/blog.schema')

mongoose
  .connect('mongodb://localhost/myblog-mongo')
  .then(() => {
    console.log('Connected to Database...')

    bulkInsert()
  })
  .catch((err) => {
    console.log(err)
  }) // Connect to database

function bulkInsert() {
  const paylods = []

  for (let i = 0; i < 300000; i++) {
    let tags = []
    for (let i = 0; i < 3; i++) {
      tags.push(generateTag())
    }
    const title = generateTitle()
    const payload = {
      title,
      slug: convertToSlug(title) + '-' + randomString(10),
      body: generateBody(),
      tags,
      category: generateCategory(),
      author: {
        _id: new mongoose.Types.ObjectId('644a4c7af39c6f38e49bb4c6'),
        name: 'Jameer'
      },
      timestamp: new Date()
    }
    paylods.push(payload)
  }

  blogModel
    .insertMany(paylods)
    .then(() => {
      console.log('All Insert done')
    })
    .catch((err) => {
      console.error(err)
    })
}
