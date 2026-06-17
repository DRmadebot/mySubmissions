const express = require('express')
let morgan = require('morgan')
const app = express()
require('dotenv').config()
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
const Person = require('./models/person')


app.get('/api/persons',(request,response)=>{
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

app.get('/info',(request,response)=>{
    Person.find({}).then(persons=>{
        response.send(`
            <p>Phonebook has info for ${persons.length} persons</p>
            <p>${new Date()}</p>
        `)
    })
})

app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id).then(person=>{
        response.json(person)
    })
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
    const body = request.body
    if (!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    const person = new Person({
        name:body.name,
        number:body.number
    })
    person.save().then(savedPerson=>{
        response.json(savedPerson)
    })
})

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})