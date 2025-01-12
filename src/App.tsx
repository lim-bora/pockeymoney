import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Mypage from "./pages/Mypage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import useUser from "./hooks/useUser";
import Navbar from "./components/layout/Navbar";

function App() {
  const { user } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" /> : <Auth />}
        />
      </Routes>

      <Navbar />
    </>
  );
}

export default App;
