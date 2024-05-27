import { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import List from "./components/List/List";
import LoginPage from "./components/Login/LoginPage";
import { fetchNotes } from "./data/Note";
import supabase from "./utils/supabase";
import "./App.scss";

function App() {
  const [mode, setMode] = useState("list");
  const [notes, setNotes] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      const fetchedNotes = await fetchNotes();
      if (fetchedNotes) {
        setNotes(fetchedNotes);
      }
    };

    getNotes();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const email = session && session.user && session.user.email;

  return !session ? (
    <LoginPage />
  ) : (
    <div className="App">
      <div className="page">
        {mode === "list" && <List noteList={notes} title="list" email={email} />}
        {mode === "board" && <Board notes={notes} />}
        <div className="">
          <button onClick={() => setMode("list")}>List</button>
          <button onClick={() => setMode("board")}>Board</button>
        </div>
      </div>
    </div>
  );
}

export default App;
