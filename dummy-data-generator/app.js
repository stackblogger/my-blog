const { default: fetch } = require('node-fetch')
const { generateTitle, generateBody, generateTag, generateCategory } = require('./helper')

function blogDataGenerator(indexCounter) {
  let tags = []
  for (let i = 0; i < 3; i++) {
    tags.push(generateTag())
  }

  const payload = {
    title: generateTitle(),
    body: generateBody(),
    tags,
    category: generateCategory()
  }

  fetch('http://localhost:3000/blogs', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbWVlckBlbmdpbmVzb2Z0LmluIiwic3ViIjoiNjQ0OTgwOWU3ZmE5ZTdkNjU5MWQ5NGI4IiwiaWF0IjoxNjgyNTgzMzA4LCJleHAiOjE2ODI2Njk3MDh9.QpNrPoFupsrbLMlYQJoKuIE0y6r-25lD1zVDvLNXJi4`,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log(indexCounter + ' Records Inserted')
      } else {
        throw Error(response.statusText)
      }
    })
    .catch((ex) => {
      console.error(ex)
    })
}

for (let i = 0; i < 100000; i++) {
  setTimeout(() => {
    blogDataGenerator(i)
  }, i * 20)
}
