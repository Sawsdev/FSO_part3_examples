const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsopenAdmin:${password}@midudevfullstackopen.zctithl.mongodb.net/testExampleNotesDatabase?retryWrites=true&w=majority&appName=midudevFullstackOpen`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


const note1 = new Note({
    content: 'HTML is easy',
    important: false,
})
const note2 = new Note({
    content: 'Browser can execute only JavaScript',
    important: true,
})

note1.save()
note2.save()



Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
