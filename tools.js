const db = require('./data')

//const
//dbconnect;

const authenticateToken = (req, res, next) =>{
  const token = req.headers['authorization'];

  if (token) {
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: 'Invalid token' });
      } else {
        // Store the decoded information in the request object for further use
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }

}



const getter = (req, res, next) =>{
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
  next()
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

const adder = (req,res, next) =>{
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

  next()
}


const deleteNoteById = (req,res,next) => {
  const query = 'DELETE FROM notes WHERE id = ?';
  db.query(query, req.params.id, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Deleted')
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
    if (err) {
      return console.error('Error executing query:', err);
    }
    res.status(200).json((results));
   });
  })
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
    const sql = 'UPDATE notes SET title = ?, body = ? WHERE id = ?';
    db.query(sql,[title, body, req.params.id], (err, results) => {
      if (err) {
        return console.error('Error executing query:', err);
      }
      const query = 'SELECT * FROM notes';
      db.query(query, (err, results) => {
        if (err) {
          return console.error('Error executing query:', err);
        }
        res.status(200).json((results));
      });
    });
    next()
  }  
module.exports = {adder,deleteNoteById, updateNoteById, getter, idGetter}