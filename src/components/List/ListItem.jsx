import { useEffect, useState } from "react";
import closeIcon from "../../img/close_icon.svg";
import dragIcon from "../../img/six_dots.svg";
import {
  completeNote,
  deleteNote,
  uncompleteNote,
  updateTitle,
  reorderNotes,
} from "../../data/Note";
import "./ListItem.scss";
import { debounce } from "../../utils/debounce.js";

const ListItem = ({ index, noteData, moveListItem }) => {
  const [note, setNote] = useState(noteData);
  const [dropping, setDropping] = useState(false);

  useEffect(() => {
    setNote(noteData);
  }, [noteData]);

  const handleTitleChange = async (e, id) => {
    const title = e.target.innerHTML;
    await updateTitle(id, title);
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

  const moveNote = async () => {};

  const allowDrop = (e) => {
    // console.log("allowDrop", e);
    e.preventDefault();
    // setDropping(true);
  };

  const drag = async (e, noteIdToMove) => {
    e.dataTransfer.setData("noteIdToMove", noteIdToMove);
  };

  return (
    <div
      className={`list-item${note.completed ? " completed" : ""}${
        dropping ? " dropping" : ""
      }`}
      // draggable="true"
      onDrop={(e) => moveListItem(e, index)}
      onDragOver={(e) => allowDrop(e)}
      id={note.id}
    >
      <div className="controls">
        {/* <div className={`action ${note.color}`} /> */}
        <img
          className="drag"
          src={dragIcon}
          alt="Drag Icon"
          onClick={() => moveNote(note)}
          // contentEditable={false}
          onDragStart={(e) => drag(e, note.id)}
        />
        <input
          className="checkbox"
          type="checkbox"
          value="completed"
          checked={note.completed || false}
          onChange={toggleComplete}
        />
      </div>
      <div
        className="item-title"
        onInput={(e) => debounce(handleTitleChange(e, note.id), 500)}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {note.title}
        {/* <span dangerouslySetInnerHTML={{ __html: note.title }} /> */}
      </div>
      {/* <input
        type="text"
        name="title"
        defaultValue={note.title}
        // value={note.title}
        placeholder={note.title && note.title.length ? null : "New Note"}
        onBlur={(e) =>
          debounce(handleTitleChange(e.target.value, note.id), 500)
        }
        // onChange={(e) => handleTitleChange(e.target.value, note.id)}
      /> */}
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
