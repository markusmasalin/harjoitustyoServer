const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')


const chapterSchema = new mongoose.Schema({
    part: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
    }, 
    chapterNumber: {
        type: Number,
        required: true
    },
    chapterName: {
        type: String,
       
        required: true
    },
    chapterElements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChapterElement'
        }
    ]

    
  })

chapterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  
module.exports = mongoose.model('Chapter', chapterSchema)
  