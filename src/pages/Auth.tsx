import { useState } from "react";
import { z as zod } from "zod";
import LoginForm from "../components/LoginForm";

const Auth = () => {
  const [mode, setMode] = useState("login");

  return (
    <div>
      <LoginForm mode={mode} setMode={setMode} />
    </div>
  );
};

export default Auth;
