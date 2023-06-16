const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');



router.get('/', (req, res) => {

    fs.readFile('./db/db.json', (err, data) => err ? console.error(err) : res.status(200).json(JSON.parse(data)));

});

router.post('/', (req, res) => {

    const { title, text } = req.body;
    if (req.body && title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };


        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let json = JSON.parse(data);
                json.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(json), (eror) => eror ? console.error(eror) : console.log(`the note ${JSON.stringify(newNote)} has been added to file`));
            }
        });

        res.status(201).json(newNote);
    } else {
        res.status(500).json('Error');
    }

});

router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    let index;
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let json = JSON.parse(data);
            for (let i = 0; i < json.length; i++) {
                const currentId = json[i].id;
                if (currentId === noteId) {
                    index = i;
                };
            };
            json.splice(index, 1);
            fs.writeFile('./db/db.json', JSON.stringify(json), (eror) => eror ? console.error(eror) : console.log(`the note with the id of ${noteId} has been deleted`));
        }
    })
    res.redirect('/')

})






module.exports = router;