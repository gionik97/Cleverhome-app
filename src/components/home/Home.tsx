import React from "react";
import { DevicesArea } from "../devicesArea/DevicesArea";
import { DetailArea } from "../detailArea/DetailArea";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home">
      <DevicesArea />
      <DetailArea />
    </div>
  );
};
