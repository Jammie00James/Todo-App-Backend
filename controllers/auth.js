const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../data')

exports.register = (req,res) => {
    const { name, email, password} = req.body

    let query = 'SELECT * FROM Users WHERE email = ?';
    db.query(query, email, async (err, result) => {
        if (err) {
            return console.error('Error executing query:', err);
        }
        if(result.length > 0){
            return res.json({message: "User alreasy exists"})
        }else{
            let hashedPassword = await bcrypt.hash(password,9);
            const user = { name, email, password: hashedPassword };
            query = 'INSERT INTO Users SET ?'
            db.query(query,user, (err, result) => {
                if(err){throw err;}
                console.log('User created')
                return res.json({message: "User created"})
            });
        }


    


    });



}