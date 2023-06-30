const {notes} = require('./data')


const adder = (req,res,next) =>{
    let { title, body } = req.body;
    console.log(req.body)
    if (!title && !body) {
      return res.status(400).json({ error: 'Title and body or required.' });
    }else if(!title){
        title = 'Untitled'
    }else if(!body){
        body = ''
    }
    const id = Number(notes[notes.length-1].id) + 1
    const note = { id,title, body };
    notes.push(note);
    next()

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
module.exports = {adder,deleteNoteById, updateNoteById}