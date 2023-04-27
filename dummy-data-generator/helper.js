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

module.exports = {
  generateTitle,
  generateBody,
  generateTag,
  generateCategory
}
