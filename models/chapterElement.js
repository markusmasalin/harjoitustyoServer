const mongoose = require('mongoose')

const chapterElementSchema = new mongoose.Schema({
    content: String,
    link: String, 
    
  })


  chapterElementSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})
  

module.exports = mongoose.model('ChapterElement', chapterElementSchema)