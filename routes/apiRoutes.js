const router = require('express').Router();
const store = require('../lib/store');

// get note function route
router.get('/notes', (req, res) => {
    store
        // saves note to server
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// posting note function route 
router.post('/notes', (req, res) => {
    console.log(req.body)
    store
        // adds note to hmtl body
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// delete note function route
router.delete('/notes/:id', (req, res) => {
    store
        // takes note id and deletes
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;