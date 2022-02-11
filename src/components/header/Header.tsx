import React from "react";
import { SiHomeassistant } from "react-icons/si";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <h1 className="headerName">Clever Home</h1>
      <SiHomeassistant color="#512DCD" />
    </div>
  );
};
