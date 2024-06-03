import { useEffect, useState } from "react";
import Note from "./Note";
import { addNote, fetchNote, fetchSubNotes } from "../../data/Note";
import "./Board.scss";

const Board = ({}) => {
  const [pageNoteId, setPageNoteId] = useState(1);
  const [pageNote, setPageNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const getPageNote = async () => {
      const fetchedPageNote = await fetchNote(pageNoteId);
      if (fetchedPageNote) {
        setPageNote(fetchedPageNote);
      }
    };
    getPageNote();
    
    const getNotes = async () => {
      const fetchedNotes = await fetchSubNotes(pageNoteId);
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      }
    };
    getNotes();
  }, []);

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const dropNote = (e) => {
    e.preventDefault();
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();

    let newNote = {
      title: "",
      body: "",
      color: "yellow",
      // parent_id: 0,
      x: e.clientX,
      y: e.clientY,
    };
    addNote(newNote);
    // addNote({parent_id: 0,  x: e.clientX,  y: e.clientY });
  };

  const notesOnBoard =
    notes !== null
      ? notes.map((note) => <Note key={note.id} note={note} />)
      : null;

  return (
    <div
      className="board"
      onDrop={(e) => dropNote(e)}
      onDragOver={(e) => allowDrop(e)}
      onDoubleClick={(e) => handleDoubleClick(e)}
    >
      <h1 className="board-title">Board</h1>

      {notesOnBoard}
    </div>
  );
};

export default Board;
