const util = require("util");
const fs = require("fs");
// package to create a unique id for each note
const uniqid = require("uniqid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// templates for read, write, add, get, and delete
class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    addNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uniqid() }

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    deleteNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Store();