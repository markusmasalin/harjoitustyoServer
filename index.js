require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Chapter = require('./models/chapter')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(express.static('build'))

let chapters = [
    {
      id: 1,
      part: 1,
      chapterNumber: 1,
      chapterName: "Aloitus",
      chapterElements: [
        {
          id: 1,
          name: "ohjeet",
          type: "text",
          content: "Tässä on ohjeet "
        },
        {
            id: 2,
            name: "arviointi",
            type: "text",
            content: "Kurssiarvosana muodostuu seuraavasti: "
        }   
      ]
    },
    {
        id: 2,
        part: 2,
        chapterNumber: 1,
        name: "Aivot ja hermostuminen",
        chapterElements: [
          {
            id: 1,
            type: "text",
            content: "Psyykkisellä toiminnalla tarkoitetaan tiedonkäsittelyä sekä tunteiden ja motivaation toimintaa. Psyykkisen toiminnan taustalla on monia biologisia tekijöitä. Esimerkiksi ihmisen aivot on biologinen tekijä ja monin tavoin yhteydessä psyykkiseen toimintaan. "
          },
          {
              id: 2,
              type: "text",
              content: "Ihmisen aivot painavat noin 1,5 kg. Ne rakentuvat yli 80 miljardista hermosolusta ja niiden välisistä yhteyksistä. Ihmisen aivot voidaan jakaa sisempiin osiin ja aivojen kuorikerrokseen. Aivojen kuorikerros on ihmisillä suurempi kuin muilla nisäkkäillä, erityisesti kuorikerroksen etuosa eli otsalohko on ihmisillä erityisen kehittynyt. Aivokuori on siten aivojen uudempia osia. Aivokuori on tärkeä esimerkiksi aistihavaintojen, ajattelun sekä toiminnan säätelyn kannalta. Eli aivokuoren toimintaa tarvitaan älykkääseen toimintaan."
          },
          {
              id: 3,
              type: "text",
              name: "Aivojen sisemmät osat vastaavat monista tahdosta riippumattomista mielen toiminnoista. Ne ovat aivojen vanhempia osia ja hyvin samankaltaisia eläinten aivojen kanssa. Tärkeä alue on esimerkiksi limbinen järjestelmä, joka on tärkeä tunteiden, motivaation ja muistin toiminnassa. Limbisen järjestelmän osia ovat esimerkiksi hippokampus ja mantelitumake. Hippokampus on tärkeä osa muistin kannalta. Sen avulla nyt mielessä olevat asiat siirtyvät pitkäkestoiseen muistiin. Mantelitumake liittyy tunteisiin, esimerkiksi pelkoon ja vihaan."
          }   

        ]
      },
  ]
   
  app.get('/api/chapters', (req, res) => {
    res.json(chapters)
  })

  app.get('/api/chapters/:id', (request, response) => {
    Chapter.findById(request.params.id).then(chapter => {
        response.json(chapter.toJSON())
    })
  })

  app.delete('/api/chapter/:id', (request, response) => {
    Chapter.findById(request.params.id).then(chapter => {
        response.json(chapter.toJSON())
    })
    const id = Number(request.params.id)
    chapter = chapters.filter(chapter => chapter.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/chapter', (request, response) => {
    const body = request.body
    console.log(body, 'body')
    
    const chapter = new Chapter({
        part: body.part,
        chapterNumber: body.chapterNumber,
        chapterName: body.chapterName,
        chapterElements: body.chapterElements,
    })
    chapter.save().then(savedChapter => {
        response.json(savedChapter.toJSON())
    })
  
  })

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })