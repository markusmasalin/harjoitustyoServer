const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
   
  app.get('/chapters', (req, res) => {
    res.json(chapters)
  })

  app.get('/chapters/:id', (request, response) => {
    const id = Number(request.params.id)
    const chapter = chapters.find(chapter => chapter.id === id)
    
    if (chapter) {
      response.json(chapter)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/chapter/:id', (request, response) => {
    const id = Number(request.params.id)
    chapter = chapters.filter(chapter => chapter.id !== id)
  
    response.status(204).end()
  })

  app.post('/chapter', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    const maxId = chapters.length > 0
    ? Math.max(...chapters.map(c => c.id)) 
    : 0

 

  const chapter = {
    part: body.part,
    chapterNumber: body.chapterNumber,
    chapterName: body.chapterNumber,
    chapterElements: body.chapterElements,
    id: generateId(),
  }
  
  chapters = chapters.concat(chapter)

    console.log(chapter)
  
    response.json(chapter)
  })

  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })