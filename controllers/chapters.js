const chaptersRouter = require('express').Router()
const Chapter = require('../models/chapter')
const Part = require('../models/part')
const ChapterElement = require('../models/chapter')


chaptersRouter.get('/', async (request, response) => {
  const chapters = await Chapter
    .find({}).populate('part', {name: 1, number: 1} )
  response.json(chapters.map(chapter => chapter.toJSON()))
  
})


  
chaptersRouter.get('/:id', (request, response, next) => {
  Chapter.findById(request.params.id)
    .then(chapter => {
      if (chapter) {
        response.json(chapter.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

chaptersRouter.get('/:id/chapterElements', async (request, response, next) => {
  try{
    const chapterElement = ChapterElement.find({ blog: request.params.id })
    if (chapterElement) {
      console.log(chapterElement)
      response.json(chapterElement)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


chaptersRouter.delete('/:id', (request, response, next) => {
  Chapter.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
  

chaptersRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(body, 'body ')
  
  try {
    const part = await Part.findById(body.part)
    console.log(part, 'part')
    const chapter = new Chapter({
      part: part,
      chapterNumber: body.chapterNumber,
      chapterName: body.chapterName
    })
    console.log(chapter, 'chapter')
    const savedChapter = await chapter.save()
    console.log(part.chapters, 'part chapters')
    const changedChapters = part.chapters.concat(chapter.id)

    console.log(changedChapters, 'changedChapters')
    const changedPart = {
      id: part.id,
      name: part.name,
      number: part.number,
      chapters: changedChapters      
    }
    response.json(savedChapter)
    console.log(body.part)
    const updatedPart = await Part.findByIdAndUpdate(body.part, changedPart, { new: true })
    console.log(updatedPart, 'updatedPart')
  } catch(exception) {
    next(exception)
  }
})

chaptersRouter.post('/:id/chapterElements', async (request, response, next) => {

  const body = request.body 
    
  const chapter = await Chapter.findById(body.chapter)
    
  try {
    const chapterElement = new ChapterElement({
      text: body.text,
    }) 
        
    console.log(chapterElement + 'comment')
    console.log(chapterElement.text + 'comment text')
    const savedchapterElement = await chapterElement.save()
    response.json(savedchapterElement)
    chapter.comments = chapter.chapterElements.concat(chapterElement)
    await chapter.save()
      
  } catch(exception) {
    next(exception)
  }
})

chaptersRouter.put('/:id', (request, response, next) => {
  const body = request.body
  
  const chapter = {
    part: body.part,
    chapterNumber: body.chapterNumber,
    chapterName: body.chapterName,
    chapterElements: body.chapterElements,
  }
  
  Chapter.findByIdAndUpdate(request.params.id, chapter, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})
  
module.exports = chaptersRouter