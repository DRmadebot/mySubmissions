const express = require('express')
let morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan((tokens, req, res)=>{
    if (tokens.method(req,res)==='POST'){
        const postBody = {"name":req.body.name, "number":req.body.number}
        return [
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            tokens.res(req,res,'content-length'),
            '-',
            tokens['response-time'](req,res),
            'ms',
            JSON.stringify(postBody)
        ].join(' ')
    }
    else{
        return [
            tokens.method(req,res),
            tokens.url(req,res),
            tokens.status(req,res),
            tokens.res(req,res,'content-length'),
            '-',
            tokens['response-time'](req,res),
            'ms'
        ].join(' ')        
    }

}))
let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response)=>{
    response.json(phonebook)
})

app.get('/info',(request,response)=>{
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${time}</p>
        `)

})

app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    if (phonebook.map(person=>person.id).includes(id)){
        const person = phonebook.find(person=>person.id===id)
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    if (phonebook.map(person=>person.id).includes(id)){
        phonebook = phonebook.filter(person=>person.id!==id)
        response.json(phonebook)
    }
    else{
        response.status(404).end()
    }
})

app.post('/api/persons',(request,response)=>{
    const id = Math.floor(Math.random()*(10**6-1)+10**6)
    const body = request.body
    const names = phonebook.map(person=>person.name)
    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    if (names.includes(body.name)){
        return response.status(402).json({
            error:'name already exists in phonebook'
        })
    }
    const person = body
    person.id = String(id)
    phonebook=phonebook.concat(person)
    response.json(person)
})

const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})