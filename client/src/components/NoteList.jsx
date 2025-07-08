export default function NoteList({ notes, onDelete}) {

    return (
        <div>
            {notes.map((note) => (
                <div className="note-card" key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                    <button className="delete-button" onClick={() => onDelete(note.id)}>
                        DELETE
                    </button>
                </div>
            ))}
            {notes.length === 0 && <p>No notes available</p>}
                
        </div>
    )
}