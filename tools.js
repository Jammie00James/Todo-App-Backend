const {notes, db} = require('./data')

//const
//dbconnect;

const getter = (req, res) =>{
  console.log(req.query)
  const {search} = req.query
  if(search){ 
    const query = 'SELECT * FROM notes WHERE title LIKE ?';
    db.query(query, [`${search}%`], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.status(200).json((results));
      return;
    })
  }else{
    const query = 'SELECT * FROM notes';
    db.query(query, (err, results) => {
    if (err) {
      return console.error('Error executing query:', err);
    }
    res.status(200).json((results));
   });
  }
}

const idGetter = (req,res,next) =>{
  const query = 'SELECT * FROM notes WHERE id = ?';
  db.query(query, req.params.id, (err, results) => {
  if (err) {
    return console.error('Error executing query:', err);
  }
  res.status(200).json((results));
  next()
 });
}

const adder = (req,res) =>{
    let { title, body } = req.body;
    console.log(req.body)
    if (!title && !body) {
      return res.status(400).json({ error: 'Title and body or required.' });
    }else if(!title){
        title = 'Untitled'
    }else if(!body){
        body = ''
    }
//    const id = Number(notes[notes.length-1].id) + 1
    const note = { title, body };
    console.log(note)
    const sql = 'INSERT INTO notes SET ?';
    db.query(sql,note, (err, result) => {
      if(err){throw err;}
      const query = 'SELECT * FROM notes';
      db.query(query, (err, results) => {
        if (err) {
          return console.error('Error executing query:', err);
        }
      res.status(200).json((results));
      });
    })
}


const deleteNoteById = (req,res,next) => {
    const index = notes.findIndex(note => note.id === Number(req.params.id));
    if (index !== -1) {
      notes.splice(index, 1);
      console.log('Delete Success') // Deletion successful
    }else{
        console.log("Delete failed")
    }
    next()
  }

  const updateNoteById = (req,res,next) => {
    let { title, body } = req.body;
    console.log(req.body)
    if (!title && !body) {
      return res.status(400).json({ error: 'Title and body or required.' });
    }else if(!title){
        title = 'Untitled'
    }else if(!body){
        body = ''
    }
    const index = notes.findIndex(note => note.id === Number(req.params.id));
    if (index !== -1) {
      notes[index] = {...notes[index], ...{title, body}}
      console.log('Update Success') // Deletion successful
    }else{
        console.log("Update failed")
    }
    next()
  }  
module.exports = {adder,deleteNoteById, updateNoteById, getter, idGetter}