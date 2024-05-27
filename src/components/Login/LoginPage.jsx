import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../utils/supabase";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    </div>
  );
};

export default LoginPage;
