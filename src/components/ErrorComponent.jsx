import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div className="flex justify-center items-center">
      <div>{alert(message)}</div>
    </div>
  );
};

export default ErrorComponent;
