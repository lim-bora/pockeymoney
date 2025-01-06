import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("로그아웃 에러", error.message);
    } else {
      alert("로그아웃 완료");
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Mypage</h1>
      <button onClick={handleLogout} className="cmButton">
        로그아웃
      </button>
    </div>
  );
};

export default Mypage;
