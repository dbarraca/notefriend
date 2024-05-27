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
  return fetchedNote;
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
export const updateNoteTitle = async (id, title) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ title: title })
    .eq("id", id)
    .select();
  if (error) {
    console.log("error", error);
    return false;
  }
  return data;
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
  console.log('collapseNote', id);
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
export const updateNoteBody = async (value, id) => {
};

// Move note location in board
export const moveNote = async (x, y, id) => {
};

// Delete note
export const deleteNote = async (id) => {
};
