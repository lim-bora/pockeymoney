import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-[40px] font-bold text-center">POCKET MONEY</h1>

      <div className="flex flex-col">
        <button className="cmButton">
          <Link to="/Login">로그인</Link>
        </button>
        <p className="text-gray-400 pt-[10px] underline">
          <Link to="/Auth">계정이 없다면 회원가입하기</Link>
        </p>
      </div>
    </div>
  );
};

export default Index;
