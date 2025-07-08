
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT||3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Utility functions
const readNotes = () => {
  const data = fs.readFileSync('notes.json', 'utf8');
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
};

// Get all notes
app.get('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id); // If your IDs are numbers

  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
});

// Add a new note
app.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// Update a note
app.put('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === noteId);
  if (index === -1) return res.status(404).json({ message: 'Note not found' });

  notes[index].id = req.body.id || notes[index].id;


  notes[index].title = req.body.title || notes[index].title;
  notes[index].content = req.body.content || notes[index].content;
  notes[index].updatedAt = new Date().toISOString();

  writeNotes(notes);
  res.json(notes[index]);
});


app.delete('/notes/:id', (req, res) => {
    const notes = readNotes();
    const noteId = parseInt(req.params.id);
    const updatedNotes = notes.filter(n => n.id !== noteId);
  
    if (notes.length === updatedNotes.length) {
      return res.status(404).json({ message: 'Note not found' });
    }
  
    writeNotes(updatedNotes);
    res.status(204).send();
  });

app.listen(PORT, () => {
  console.log(`Note Keeper API running at http://localhost:${PORT}`);
});
