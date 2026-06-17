const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-sc7nxf6-shard-00-00.puny7dx.mongodb.net:27017,ac-sc7nxf6-shard-00-01.puny7dx.mongodb.net:27017,ac-sc7nxf6-shard-00-02.puny7dx.mongodb.net:27017/phonebookPartThree?ssl=true&replicaSet=atlas-z67vxi-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length==3){
    Person.find({}).then(persons=>{
        console.log(persons)
        mongoose.connection.close()
    })
}

if (process.argv.length>3){
    const person = new Person({
        name:process.argv[3],
        number:process.argv[4]
    })
    person.save().then(result=>{
        console.log('person added')
        mongoose.connection.close()
    })
}
