import React from "react";

const Loader = () => {
  return (
    <div className="loader w-full p-3 h-dvh flex justify-center items-center flex-col gap-4">
      <div className="border-black border-b-4 w-20 h-20 rounded-full animate-spin"></div>
      <p>Loading</p>
    </div>
  );
};

export default Loader;
