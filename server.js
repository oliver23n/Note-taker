
// WHEN I click on an existing note in the list in the left - hand column
// THEN that note appears in the right - hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right - hand column

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const uuid = require('./helpers/uuid');

const fs = require('fs');
const notes = require('./db/db.json')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res) => {
    res.sendFile('/public/index.html');
})
app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname ,'/public/notes.html'));
})

app.get('/api/notes',(req,res)=> {
    res.status(200).json(notes);
});

app.post('/api/notes',(req,res) =>{

    const {title, text} = req.body;
    if(req.body && title && text){
        const newNote = {
            title,
            text,
            id:uuid()
        };


        fs.readFile('./db/db.json', (err,data) =>{
            if(err){
                console.error(err);
            }else{
                let json = JSON.parse(data);
                json.push(newNote);
                fs.writeFile('./db/db.json',JSON.stringify(json), (eror) => eror ? console.error(eror):console.log(`the note ${newNote} has been added to file`));
            }});

        const response = {
            status:'success',
            body: newNote
        }
        

        res.status(201).json(newNote);
    } else {
        res.status(500).json('Error in posting review');
    }

});

app.delete('/api/notes/:id', (req,res) => {
    const noteId = req.params.id;


})

app.listen(PORT, ()=> {
    console.log(`listening to Port : ${PORT}`);
})
