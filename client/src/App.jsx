import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    const res = await axios.post(API_URL, note);
    setNotes(prev => [...prev, res.data]);
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <div className="p-4">
      <h1>Note Keeper</h1>
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
