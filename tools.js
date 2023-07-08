const db = require('./data')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');

dotenv.config({path:'./.env'})

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      } else {
        //Check if user exists from db
        const sql = 'SELECT id,name,email FROM Users WHERE email = ?';
        db.query(sql, decoded.email, (err, results) => {
          if (err) {
            return console.log(err);
          }
          if (results.length === 0) {
            return console.log("no user found");
          }
          //Store the decoded information in the request object for further use
          const user = results[0];
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(401).json({ error: 'No token provided' });
  }
}



const getter = (req, res, next) => {
  const user = req.user;
  const { search } = req.query
  if (search) {
    const query = 'SELECT * FROM Notes WHERE title LIKE ? and user_id = ?';
    db.query(query, [`${search}%`, user.id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      res.status(200).json((results));
      return;
    });
  } else {
    const query = 'SELECT * FROM Notes WHERE user_id = ?';
    db.query(query, user.id, (err, results) => {
      if (err) {
        return console.error('Error executing query:', err);
      }
      return res.status(200).json((results));
    });
  }
}

const idGetter = (req, res, next) => {
  const user = req.user;
  const query = 'SELECT * FROM Notes WHERE user_id = ? and id = ?';
  db.query(query, [user.id, req.params.id], (err, results) => {
    if (err) {
      return console.error('Error executing query:', err);
    }
    res.status(200).json((results));
    next()
  });
}

const adder = (req, res, next) => {
  const user = req.user;
  let { title, body } = req.body;
  console.log(req.body)
  if (!title && !body) {
    return res.status(400).json({ error: 'Title and body or required.' });
  } else if (!title) {
    title = 'Untitled'
  } else if (!body) {
    body = ''
  }

  const note = { user_id: user.id, title, body };
  console.log(note)
  const sql = 'INSERT INTO Notes SET ?';
  db.query(sql, note, (err, result) => {
    if (err) { throw err; }
    const query = 'SELECT * FROM Notes WHERE user_id = ?';
    db.query(query, user.id, (err, results) => {
      if (err) {
        return console.error('Error executing query:', err);
      }
      res.status(200).json((results));
    });
  })
  next()
}


const deleteNoteById = (req, res, next) => {
  const user = req.user
  const query = 'DELETE FROM Notes WHERE user_id = ? and id = ?';
  db.query(query, [user.id, req.params.id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Deleted')
    const sql = 'SELECT * FROM Notes WHERE user_id = ?';
    db.query(sql, user.id, (err, results) => {
      if (err) {
        return console.error('Error executing query:', err);
      }
      res.status(200).json((results));
    });
  })
  next()
}

const updateNoteById = (req, res, next) => {
  const user = req.user
  let { title, body } = req.body;
  console.log(req.body)
  if (!title && !body) {
    return res.status(400).json({ error: 'Title and body or required.' });
  } else if (!title) {
    title = 'Untitled'
  } else if (!body) {
    body = ''
  }
  const sql = 'UPDATE Notes SET title = ?, body = ? WHERE id = ?';
  db.query(sql, [title, body, req.params.id], (err, results) => {
    if (err) {
      return console.error('Error executing query:', err);
    }
    const query = 'SELECT * FROM Notes WHERE user_id = ?';
    db.query(query, user.id, (err, results) => {
      if (err) {
        return console.error('Error executing query:', err);
      }
      res.status(200).json((results));
    });
  });
  next()
}
module.exports = { adder, deleteNoteById, updateNoteById, getter, idGetter, authenticateToken }