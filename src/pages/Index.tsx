import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-[40px] font-bold text-center">POCKET MONEY</h1>

      <div className="flex flex-col">
        <button className="cmButton">
          <Link to="/Auth">로그인 또는 회원가입</Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
