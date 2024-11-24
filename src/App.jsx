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

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const email = session?.user?.email;
  const userId = session?.user?.id;

  return !session ? (
    <LoginPage />
  ) : (
    <div className="App">
      <div>Signed In as: {email}</div>
      <button onClick={signout}>Sign out</button>
      <div className="page">
        {mode === "list" && <List title="list" email={email} userId={userId} />}
        {mode === "board" && <Board />}
        <div className="">
          <button className="button" onClick={() => setMode("list")}>
            List
          </button>
          <button className="button" onClick={() => setMode("board")}>
            Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
