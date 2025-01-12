import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {/* 온보딩, 로그인페이지에서만 네비게이션 안보이게 */}
      {location.pathname !== "/" && location.pathname !== "/auth" && (
        <div className="flex justify-between bg-white rounded-[24px] py-[25px] px-[20px] fixed bottom-0 max-w-[768px] w-full">
          <Link to="/home">Home</Link>
          <Link to="/new">New</Link>
          <Link to="/mypage">Mypage</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
