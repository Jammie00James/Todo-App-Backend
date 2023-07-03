const mysql     = require('mysql');

const db = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

db.connect((err) => {
  if (err){
     console.log(err);
     return;
  }
  console.log("It Db has connected")
});


module.exports = db
