const mongoose = require('mongoose')

const chapterElementSchema = new mongoose.Schema({
    text: String,
  })


  chapterElementSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})
  

module.exports = mongoose.model('ChapterElement', chapterElementSchema)