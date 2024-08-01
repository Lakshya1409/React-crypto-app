import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="bg-black p-2 justify-evenly flex sticky top-0 z-10"
      style={{ height: "6vh" }}
    >
      <button className=" text-white text-lg font-bold outline-none p-1">
        <Link to="/">Home</Link>
      </button>
      <button className=" text-white  text-lg font-bold outline-none p-1">
        <Link to="/exchanges">Exchanges</Link>
      </button>
      <button className=" text-white text-lg font-bold outline-none p-1">
        <Link to="/coins">Coins</Link>
      </button>
    </div>
  );
};

export default Header;
