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

app.delete('/api/persons/:id',(request,response,next)=>{
    Person.findByIdAndDelete(request.params.id)
    .then(result=>{
        response.status(204).end()
    })
    .catch(error=>next(error))
})

app.post('/api/persons',(request,response,next)=>{
    const body = request.body

    const person = new Person({
        name:body.name,
        number:body.number
    })
    person.save().then(savedPerson=>{
        response.json(savedPerson)
    })
    .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{
    const {name, number}=request.body
    Person.findById(request.params.id)
    .then(person=>{
        if(!person){
            return response.status(404).end()
        }
        person.name=name
        person.number=number
        return person.save().then(updatedPerson=>{
            response.json(updatedPerson)
        })
    })
    .catch(error=>next(error))
})




const unknownEndpoint = (request,response)=>{
    response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error,request,response,next)=>{
    console.error(error.message)
    if(error.name==='CastError'){
        return response.status(400).send({error:'malformatted id'})
    }
    else if(error.name==='ValidationError'){
        return response.status(400).json({error:error.message})
    }
    next(error)
}

app.use(errorHandler)


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})