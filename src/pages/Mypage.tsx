import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Mypage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // console.log("user", user);
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
      {user ? (
        <>
          <h1>{user.user_metadata.nickname}님 안녕하세요!</h1>
          <button onClick={handleLogout} className="cmButton">
            로그아웃
          </button>
        </>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default Mypage;
