import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import {
  addNote,
  fetchNote,
  fetchSubNotes,
  hideCompletedSubNotes,
  showCompletedSubNotes,
  reorderNotes
} from "../../data/Note";
import { debounce } from "../../utils/debounce.js";
import "./List.scss";
import "../Common/Colors.scss";

const List = ({ email, title, index }) => {
  const [pageNoteId, setPageNoteId] = useState(1);
  const [pageNote, setPageNote] = useState(null);
  const [notes, setNotes] = useState([]);
  // const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const getPageNote = async () => {
      const fetchedPageNote = await fetchNote(pageNoteId);
      if (fetchedPageNote) {
        setPageNote(fetchedPageNote);
      }
    };
    getPageNote();
  }, [pageNoteId]);

  useEffect(() => {
    const getNotes = async () => {
      const fetchedNotes = await fetchSubNotes(pageNoteId);
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      }
    };
    getNotes();
  }, [pageNote]);

  const handleAddClick = (e) => {
    e.preventDefault();

    let newNote = {
      title: "",
      body: "",
      color: "yellow",
      collapsed: false,
      completed: false,
      parentId: 1,
      x: 100,
      y: 100,
      email,
    };
    const addedNote = addNote(newNote);
    setNotes((prev) => [...prev, addedNote]);
  };

  const toggleShowCompleted = () => {
    debounce(
      (async function () {
        let updatedPageNote;
        if (pageNote.hideCompletedSub) {
          updatedPageNote = await showCompletedSubNotes(pageNoteId);
        } else {
          updatedPageNote = await hideCompletedSubNotes(pageNoteId);
        }
        // console.log("updatedPageNote", updatedPageNote);
        setPageNote(updatedPageNote);
      })(),
      500
    );
  };

  const moveListItem = async (e, index) => {
    e.preventDefault();
    const noteIdToMove = e.dataTransfer.getData("noteIdToMove");
    await reorderNotes(pageNoteId, noteIdToMove, index);
  };

  const noteElems =
    notes &&
    notes
      .sort((noteA, noteB) => noteA.id - noteB.id)
      .map((note, index) => {
        return (
          <ListItem
            noteData={note.notes}
            key={index}
            email={email}
            index={index}
            moveListItem={moveListItem}
          />
        );
      });


  return (
    <div className="list-page">
      {pageNote && (
        <div
          className={`list${
            pageNote.hideCompletedSub ? "" : " show-completed"
          }`}
        >
          <h1 className="title">
            {pageNote.title}
            <button className="button" onClick={toggleShowCompleted}>
              {pageNote.hideCompletedSub ? "Show" : "Hide"} Completed Notes
            </button>
          </h1>
          <div
            className="notes"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {noteElems}
          </div>
          <button onClick={handleAddClick}>Add Note +</button>
        </div>
      )}
    </div>
  );
};

export default List;
