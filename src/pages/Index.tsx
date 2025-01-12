import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <h1 className="text-[40px] font-bold text-center">POCKET MONEY</h1>

      <div className="flex flex-col w-full">
        <button className="cmButton">
          <Link to="/Auth">회원가입 하러가기</Link>
        </button>
      </div>
    </div>
  );
};

export default Index;
