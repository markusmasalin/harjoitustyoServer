const partsRouter = require('express').Router()
const Part = require('../models/part')


partsRouter.get('/', async (request, response, next) => {
  try {
    const parts = await Part
      .find({}).populate('chapter',  {chapterName: 1, chapterNumber: 1}  )
    response.json(parts.map(part => part.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

  
partsRouter.get('/:id', (request, response, next) => {
  Part.findById(request.params.id).populate('chapter',  {name: 1, number: 1}  )
    .then(part => {
      if (part) {
        response.json(part.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



partsRouter.delete('/:id', (request, response, next) => {
  Part.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
  

partsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {  
    const part = new Part({
      name: body.name,
      number: Number(body.number),
    })
    await part.save()
    console.log(part, 'part')
    const savedPart = await part.save()
    response.json(savedPart)
    
  } catch(exception) {
    next(exception)
  }

})

  
module.exports = partsRouter