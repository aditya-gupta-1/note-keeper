import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    onAdd?.({ title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          className="note-title"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="note-content"
          placeholder="Write your note here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit">Add Note</button>
    </form>
  );
}
