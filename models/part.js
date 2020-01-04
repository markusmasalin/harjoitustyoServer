const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
    name: String,
    number: Number,
    chapters: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter'
        }
    ]
  })


partSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})
  

module.exports = mongoose.model('Part', partSchema)