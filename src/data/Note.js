import supabase from "../utils/supabase";

// Fetch note
export const fetchNote = async (id) => {
  const { data: fetchedNote, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id);
  if (error) {
    console.log("error", error);
    return false;
  }
  return fetchedNote && fetchedNote[0];
};

// Fetch user's main note
export const fetchMainNote = async (user_id) => {
  const { data: fetchedNote, error } = await supabase
    .from("user_main_note")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.log("error", error);
    return false;
  }
  return fetchedNote && fetchedNote[0];
};

// Fetch notes
export const fetchNotes = async () => {
  const { data: fetchedNotes, error } = await supabase
    .from("notes")
    .select("*");
  if (error) {
    console.log("error", error);
    return false;
  }
  return fetchedNotes;
};

// Fetch list's notes
// export const fetchSubNotes = async (id) => {
//   const { data: fetchedNotes, error } = await supabase
//     .from("notes")
//     .select("*")
//     .eq("parent_id", id);
//   if (error) {
//     console.log("error", error);
//     return false;
//   }
//   return fetchedNotes;
// };

// Fetch list's notes
export const fetchSubNotes = async (id) => {
  const { data: fetchedNotes, error } = await supabase
    .from("list_note")
    .select(
      "notes!sub_note_id(id,title, completed, collapsed, body, hide_completed_sub)"
    )
    .eq("parent_note_id", id)
    .order("custom_sort", "created_at");
  if (error) {
    console.log("error", error);
    return false;
  }
  return fetchedNotes;
};

// Add new note
export const addNote = async (note) => {
  const { data, error } = await supabase.from("notes").insert([note]).select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

// Title note
export const updateTitle = async (id, title) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ title: title })
    .eq("id", id)
    .select();
  console.log("data", data);
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

// Title note
export const reorderNotes = async (
  parentNoteId,
  noteIdToMove,
  indexToMoveTo
) => {
  const { data, error } = await supabase.rpc("reorder_custom_sorted_notes", {
    parent_id: parentNoteId,
    note_id_to_move: noteIdToMove,
    index_to_move_to: indexToMoveTo,
  });
  // const { data, error } = await supabase
  //   .from("list_note")
  //   .update({ custom_sort: indexToMoveTo })
  //   .eq("parent_note_id", parentNoteId)
  //   .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

export const showCompletedSubNotes = async (id) => {
  return changeCompletedSubnoteVisibility(id, false);
};

export const hideCompletedSubNotes = async (id) => {
  return changeCompletedSubnoteVisibility(id, true);
};

export const changeCompletedSubnoteVisibility = async (id, isHidden) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ hide_completed_sub: isHidden })
    .eq("id", id)
    .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data && data[0];
};

export const completeNote = async (id) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ completed: true })
    .eq("id", id)
    .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

export const uncompleteNote = async (id) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ completed: false })
    .eq("id", id)
    .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

export const toggleCollapseNote = async (id, status) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ collapsed: status })
    .eq("id", id)
    .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
};

// Edit note body
export const updateNoteBody = async (value, id) => {};

// Move note location in board
export const moveNote = async (x, y, id) => {};

// Delete note
export const deleteNote = async (id) => {};
