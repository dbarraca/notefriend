import { useEffect, useState } from "react";
import closeIcon from "../../img/close_icon.svg";
import {
  completeNote,
  deleteNote,
  uncompleteNote,
  updateNoteTitle,
} from "../../data/Note";
import "./ListItem.scss";
import { debounce } from "../../utils/debounce.js";

const ListItem = ({ noteData }) => {
  const [note, setNote] = useState(noteData);

  useEffect(() => {
    setNote(noteData);
  }, [noteData]);

  const handleTitleChange = async (title, id) => {
    const updatedNote = await updateNoteTitle(id, title);
  };

  const toggleComplete = async () => {
    let updatedNote = {};
    if (note.completed) {
      updatedNote = await uncompleteNote(note.id);
    } else {
      updatedNote = await completeNote(note.id);
    }
    setNote(updatedNote[0]);
  };

  return (
    <div className={`list-item${note.completed ? " completed" : ""}`}>
      <input
        type="checkbox"
        value="completed"
        checked={note.completed}
        onClick={toggleComplete}
      />
      {/* <div className={`action ${note.color}`} /> */}
      <input
        type="text"
        name="title"
        defaultValue={note.title}
        // value={note.title}
        placeholder={note.title && note.title.length ? null : "New Note"}
        onBlur={(e) =>
          debounce(handleTitleChange(e.target.value, note.id), 500)
        }
        // onChange={(e) => handleTitleChange(e.target.value, note.id)}
      />
      {/* <textarea
        name="title"
        // defaultValue={note.title}
        value={note.body}
        placeholder={note.title && note.title.length ? null : "New Note"}
        // onBlur={(e) => handleTitleChange(e.target.value, note.id)}
        onChange={}
      /> */}
      {/* <img
        className="close"
        src={closeIcon}
        alt="Close Icon"
        onClick={() => deleteNote(note.id)}
      /> */}
    </div>
  );
};

export default ListItem;
