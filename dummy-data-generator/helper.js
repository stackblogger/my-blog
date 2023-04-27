const LoremIpsum = require('lorem-ipsum').LoremIpsum

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

function generateTitle() {
  return lorem.generateWords(10)
}

function generateBody() {
  return lorem.generateParagraphs(10)
}

function generateTag() {
  return {
    name: lorem.generateWords(1)
  }
}

function generateCategory() {
  return {
    name: lorem.generateWords(1)
  }
}

function convertToSlug(str) {
  return str
    .replace(/\s/g, '-') // replace all spaces with -
    .toLowerCase()
    .replace(/[^\w\s]/g, '-') // replace all special chars with -
    .replace(/[0-9]/g, '') // remove all numbers
    .replace(/\-{2,}/g, '-') // replace more than one - with single -
    .replace(/-$/, '') // replace last char if its -
    .trim() // remove any spaces from start or end
    .replace(/^-/, '') // remove first - if there is any
}

const ALPHA_STRING = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function randomString(length) {
  let s = ''
  while (s.length < length) {
    s += ALPHA_STRING.charAt((Math.random() * 62) | 0)
  }
  return s.toLowerCase()
}

module.exports = {
  generateTitle,
  generateBody,
  generateTag,
  generateCategory,
  convertToSlug,
  randomString
}
