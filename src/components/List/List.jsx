import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { addNote } from "../../data/Note";
import "./List.scss";
import "../Common/Colors.scss";

const List = ({ noteList, email, title }) => {
  const [notes, setNotes] = useState(noteList);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    setNotes(noteList);
  }, [noteList]);

  const noteElems =
    noteList &&
    notes.map((note, index) => {
      return <ListItem noteData={note} key={index} email={email} />;
    });

  const handleAddClick = (e) => {
    e.preventDefault();

    let newNote = {
      title: "",
      body: "",
      color: "yellow",
      collapsed: false,
      completed: false,
      parentId: 0,
      x: 100,
      y: 100,
      email,
    };
    const addedNote = addNote(newNote);
    setNotes((prev) => [...prev, addedNote]);
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  return (
    <div className="list-page">
      <div className={`list${showCompleted ? " show-completed" : ""}`}>
        <h1>
          {title}
          <button onClick={toggleShowCompleted}>
            {showCompleted ? "Hide" : "Show"} Completed Notes
          </button>
        </h1>
        <div className="notes">{noteElems}</div>
        <button onClick={handleAddClick}>Add Note +</button>
      </div>
    </div>
  );
};

export default List;
