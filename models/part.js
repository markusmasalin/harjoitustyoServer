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
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  

module.exports = mongoose.model('Part', partSchema)