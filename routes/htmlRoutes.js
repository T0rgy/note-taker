const router = require('express').Router();
const path = require('path');


//Sends notes to the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//Sends to the homepage if a pathing issue exists
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;