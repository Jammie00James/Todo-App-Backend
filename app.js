const express = require('express')
const bodyParser = require('body-parser');
const {adder, getter, deleteNoteById, updateNoteById, idGetter} = require('./tools')
//const auth = require('./authenticate')

const app = express()

app.use(bodyParser.json());

app.get('/',getter,(req,res) => {
    
})

app.get('/:id', idGetter, (req,res) => {

})

app.post('/', adder, (req, res) => {
    
  });
  
app.delete('/:id', deleteNoteById, (req, res) => {
    
  });  

app.put('/:id', updateNoteById, (req, res) => {
    
  });  

app.all('*', (req,res) => {
    res.status(404).send('Page not Found')
})

app.listen(5000, ()=>{
    console.log('App is running on port 5000')
})
