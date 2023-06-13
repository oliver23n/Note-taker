// GIVEN a note - taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left - hand column, plus empty fields to enter a new note title and the note’s text in the right - hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left - hand column with the other existing notes
// WHEN I click on an existing note in the list in the left - hand column
// THEN that note appears in the right - hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right - hand column

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

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
    let response;
    if(req.body && req.body.title && req.body.text){
        response = {
            status : 'succes',
            data : req.body
        }
        res.status(201).json(response.data);
    }

})

app.listen(PORT, ()=> {
    console.log(`listening to Port : ${PORT}`);
})
