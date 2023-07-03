const mysql     = require('mysql');

const db = mysql.createConnection({
  host     : 'ddatabase-1.cyhxghdtjrvc.us-west-2.rds.amazonaws.com',
  port     : 3306,
  user     : 'admin',
  password : 'password',
  database : 'todoapp'
});

db.connect((err) => {
  if (err){
     console.log(err);
     return;
  }
  console.log("It Db has connected")
});


module.exports = db
