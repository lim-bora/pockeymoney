import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

const Auth = () => {
  const [mode, setMode] = useState("signup");

  return (
    <div>
      <LoginForm mode={mode} setMode={setMode} />
    </div>
  );
};

export default Auth;
