const { nanoid } = require('nanoid')
const express = require('express')
const app = express()

app.use(express.json())


let persons = [
    { 
      "id": nanoid(),
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": nanoid(),
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": nanoid(),
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": nanoid(),
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getInfo = () => (
    `<p><strong>Phonebook</strong> has info for ${persons.length} people.</p>\n
     <p>${new Date()}</p>`
)


app.get('/info', (req, res) => {
    res.send(getInfo())
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
 
})

app.post('/api/persons/', (req, res) => {
    const person = req.body

    let personAlreadyExists = false
    for (let old_person of persons) {
        if (person.name === old_person.name) {
            personAlreadyExists = true
            break
        }
    }
    if (personAlreadyExists) {
        return res.status(400).json({ 
            error: 'Name must be unique' 
        })
    } else if (!person.name) {
        return res.status(400).json({ 
            error: 'Person doesn\'t have a name' 
        })
    } else if (!person.number) {
        return res.status(400).json({ 
            error: 'Person doesn\'t have a number' 
        })
    }

    person.id = nanoid()
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    console.log(`Deleting person with id ${id}`, persons)
    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})