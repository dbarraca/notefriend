import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import {
  addNote,
  fetchNote,
  fetchSubNotes,
  hideCompletedSubNotes,
  showCompletedSubNotes,
  reorderNotes,
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
        setNotes(fetchedNotes.map((note) => note.notes));
        // setNotes(fetchedNotes);
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
      parent_id: 1,
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
        if (pageNote.hide_completed_sub) {
          updatedPageNote = await showCompletedSubNotes(pageNoteId);
        } else {
          updatedPageNote = await hideCompletedSubNotes(pageNoteId);
        }
        setPageNote(updatedPageNote);
      })(),
      500
    );
  };

  const moveListItem = async (e, indexToMoveTo) => {
    e.preventDefault();
    const noteIdToMove = parseInt(e.dataTransfer.getData("noteIdToMove"));
    await reorderNotes(pageNoteId, noteIdToMove, indexToMoveTo);
    setNotes((prev) => {
      // console.log("prev", prev);
      const noteToMove = prev.find(
        (note) => note.id === parseInt(noteIdToMove)
      );
      const noteToMoveIndex = prev.findIndex(
        (note) => note.id === parseInt(noteIdToMove)
      );
      // console.log("noteIdToMove", noteIdToMove);
      // console.log("indexToMoveTo", indexToMoveTo);
      // console.log("noteToMoveIndex", noteToMoveIndex);
      // console.log("noteToMove", noteToMove);
      let aboveMoved = [];
      let belowMoved = [];
      if (noteToMoveIndex < indexToMoveTo) {
        aboveMoved =  prev.slice(0, indexToMoveTo + 1);
        belowMoved =  prev.slice(indexToMoveTo + 1);
        aboveMoved = aboveMoved.filter(note => note.id !== noteIdToMove);
      }
      else {
        aboveMoved =  prev.slice(0, indexToMoveTo);
        belowMoved =  prev.slice(indexToMoveTo);
        belowMoved = belowMoved.filter(note => note.id !== noteIdToMove);
      }
      // console.log("aboveMoved", aboveMoved);
      // console.log("belowMoved", belowMoved);
      const reordered = [...aboveMoved, {moved: true,...noteToMove}, ...belowMoved];
      // console.log("withoutToMove", withoutToMove);
      // const reordered = withoutToMove.toSpliced(parseInt(indexToMoveTo) - 1, 0, noteToMove);
      // console.log("reordered", reordered);
      return reordered;
    });
  };

  const noteElems =
    notes &&
    notes
      // .sort((noteA, noteB) => noteA.id - noteB.id)
      .map((note, index) => {
        return (
          <ListItem
            noteData={note}
            key={index}
            email={email}
            index={index}
            moveListItem={moveListItem}
          />
        );
      });

  console.log("pageNote", pageNote);

  return (
    <div className="list-page">
      {pageNote && (
        <div
          className={`list${
            pageNote.hide_completed_sub ? "" : " show-completed"
          }`}
        >
          <h1 className="title">
            {pageNote.title}
            <button className="button" onClick={toggleShowCompleted}>
              {pageNote.hide_completed_sub ? "Show" : "Hide"} Completed Notes
            </button>
          </h1>
          <div
            className="notes"
            // contentEditable={true}
            // suppressContentEditableWarning={true}
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
