const express = require('express')

const app = express()
const cors = require('cors')
const Note = require('./models/note')
// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]





const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('------:');
  
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.use(express.static('dist'))


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
    mongoose.connection.close()
  })
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
  return maxId +1
}

app.post('/api/notes', (request, response) => {
    
    const body = request.body
    
    if (!body.content) {
        return response.status(400).json({
          error: 'content missing'
        })
    }


    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/api/notes/:id', (request,response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
        
    } else {
        response.status(404).send('Note not found')
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).json({"message": `Note ${id} succesfully removed!`})
})

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server runing on port ${PORT}`);