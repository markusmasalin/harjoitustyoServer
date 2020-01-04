const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
  
  console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const chapterSchema = new mongoose.Schema({
    part: {
        type: Number,
       
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
  