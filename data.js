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




const notes = [
  {id: 1, title: 'My love', body: 'MY love is a brown skin, yellow headed lady'},
  {id: 2, title: 'My love', body: 'MY love is a brown skin, yellow headed lady'},
  {id: 3, title: 'My love', body: 'MY love is a brown skin, yellow headed lady'},
  {id: 4, title: 'My love', body: 'MY love is a brown skin, yellow headed lady'},
  {id: 5, title: 'Happy boy', body: 'MY love is a brown skin, yellow headed lady'},
  {id: 6, title: 'Player', body: 'MY love is a brown skin, yellow headed lady'}

]
module.exports = {notes, db}
