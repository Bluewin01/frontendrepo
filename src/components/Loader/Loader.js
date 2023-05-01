import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="spinner-frame">
        <div className="spinner-cover"></div>
        <div className="spinner-bar"></div>
      </div>
    </div>
  );
};

export default Loader;
