
const express = require('express')
 
const app = express()
 

app.use(express.json())

let notes = [
    {
        'id': 1,
        'content': 'Me tengo que suscribir a midudev en youtube',
        'date' : '2019-05-0660150000',
        'important': true
    },
    {
        'id': 2,
        'content': 'Me tengo que desuscribir a midudev en youtube',
        'date' : '2020-05-0660150000',
        'important': false
    },
    {
        'id': 3,
        'content': 'Tengo que desactivar la campanita del canal de midudev en youtube',
        'date' : '2021-05-0660150000',
        'important': true
    }
]
 
app.get('/', (req, res) => {

    res.send('<h1>Hello world</h1>')

})

app.get('/api/notes', (req, res) => {
    
    res.json(notes)

})


app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find( note => note.id === id)
    if(note){
        res.send(note)        
    }else {
        res.status(404).end()
    }
})


app.delete('/api/notes/:id', (req, res) => {
    
    const id = Number(req.params.id)
    notes = notes.filter( note => note.id !== id)
    
    res.status(204).end()

})

app.post('/api/notes', (req, res) => {
    const note = req.body
   
    console.log(note)

    const ids =notes.map(note => note.id)

    const maxId = Math.max(...ids)

    const newNote = {

        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.json(notes)

})



const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
