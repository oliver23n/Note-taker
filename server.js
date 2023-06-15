const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

// const uuid = require('./helpers/uuid');
// const fs = require('fs');
const api = require('./routes/notes')


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes',api);


app.get('/', (req,res) => {
    res.sendFile('/public/index.html');
})
app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname ,'/public/notes.html'));
})

// app.get('/api/notes',(req,res)=> {

//     fs.readFile('./db/db.json', (err, data) => err ? console.error(err) : res.status(200).json(JSON.parse(data)));

//     });
    


// app.post('/api/notes',(req,res) =>{

//     const {title, text} = req.body;
//     if(req.body && title && text){
//         const newNote = {
//             title,
//             text,
//             id:uuid()
//         };


//         fs.readFile('./db/db.json', (err,data) =>{
//             if(err){
//                 console.error(err);
//             }else{
//                 let json = JSON.parse(data);
//                 json.push(newNote);

//                 fs.writeFile('./db/db.json',JSON.stringify(json), (eror) => eror ? console.error(eror):console.log(`the note ${JSON.stringify(newNote)} has been added to file`));
//             }});

//         res.status(201).json(newNote);
//     } else {
//         res.status(500).json('Error');
//     }

// });

// app.delete('/api/notes/:id', (req,res) => {
//     const noteId = req.params.id;
//     let index;
//     fs.readFile('./db/db.json', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             let json = JSON.parse(data);
//             for(let i = 0; i<json.length; i++){
//                 const currentId = json[i].id;
//                 if(currentId === noteId){
//                     index = i;
//                 };
//             };
//             json.splice(index,1);
//             fs.writeFile('./db/db.json', JSON.stringify(json), (eror) => eror ? console.error(eror) : console.log(`the note with the id of ${noteId} has been deleted`)); 
//             res.redirect('/');
//         }
//     })


//     })


app.listen(PORT, ()=> {
    console.log(`listening to Port : ${PORT}`);
})
