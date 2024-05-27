import { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import List from "./components/List/List";
import LoginPage from "./components/Login/LoginPage";
import supabase from "./utils/supabase";
import "./App.scss";

function App() {
  const [mode, setMode] = useState("list");
  const [session, setSession] = useState(null);

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
        {mode === "list" && <List title="list" email={email} />}
        {mode === "board" && <Board />}
        <div className="">
          <button className="button" onClick={() => setMode("list")}>List</button>
          <button className="button"  onClick={() => setMode("board")}>Board</button>
        </div>
      </div>
    </div>
  );
}

export default App;
