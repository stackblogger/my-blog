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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppbWN1dGU4ODc5QGdtYWlsLmNvbSIsInN1YiI6IjY0NDk3YmRjMWU1NmY2Zjc0ZGRjMmY2NiIsImlhdCI6MTY4MjYzMTY2MSwiZXhwIjoxNjg1MjIzNjYxfQ.N-uoFHoq3SPAXI0mzopKltY0jjETGQEVoMyhWzOg8Kg`,
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
