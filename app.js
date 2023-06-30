const express = require('express')
const path = require('path')
const {notes} = require('./data')
const bodyParser = require('body-parser');
const {adder, deleteNoteById, updateNoteById} = require('./tools')
//const auth = require('./authenticate')

const app = express()

app.use(bodyParser.json());

app.get('/',(req,res) => {
    const {search} = req.query
    let sortedNotes = [...notes];
    if(search){ 
        sortedNotes = sortedNotes.filter((note) => {
            return note.title.toLowerCase().startsWith(search.toLowerCase())
        })
    }
    res.status(200).json(sortedNotes)
})

app.get('/:id',(req,res) => {
    const singleNote = notes.find((note)=> note.id === Number(req.params.id))
    if(!singleNote){
       return res.status(200).json([{status:'not found'}])
    }
    res.status(200).json(singleNote)
})

app.post('/', adder, (req, res) => {
    res.status(200).json(notes);
  });
  
app.delete('/:id', deleteNoteById, (req, res) => {
    res.status(200).json(notes);
  });  

app.put('/:id', updateNoteById, (req, res) => {
    res.status(200).json(notes);
  });  

app.all('*', (req,res) => {
    res.status(404).send('Page not Found')
})

app.listen(5000, ()=>{
    console.log('App is running on port 5000')
})
