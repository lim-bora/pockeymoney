import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Mypage from "./pages/Mypage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {/* 온보딩, 로그인페이지에서만 네비게이션 안보이게 */}
      {location.pathname !== "/" && location.pathname !== "/Auth" && (
        <div>
          <Link to="/Home">Home</Link>
          <Link to="/New">New</Link>
          <Link to="/Mypage">Mypage</Link>
        </div>
      )}
    </>
  );
}

export default App;
