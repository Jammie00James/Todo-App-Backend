const express = require('express')
const bodyParser = require('body-parser');
const {adder, getter, deleteNoteById, updateNoteById, idGetter, authenticateToken} = require('./tools')


const app = express()

app.use(bodyParser.json());
app.use('/auth', require('./routes/auth'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', authenticateToken, getter,(req,res) => {   
})
app.get('/:id', authenticateToken, idGetter, (req,res) => {
})
app.post('/',authenticateToken, adder, (req, res) => {
});  
app.delete('/:id',authenticateToken, deleteNoteById, (req, res) => {    
});  
app.put('/:id',authenticateToken, updateNoteById, (req, res) => {  
});  
app.all('*',authenticateToken, (req,res) => {
  res.status(404).send('Page not Found')
})


app.listen(5000, ()=>{
    console.log('App is running on port 5000')
})
