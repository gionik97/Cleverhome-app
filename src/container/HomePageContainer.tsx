import React from "react";
import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";
import "./HomePageContainer.css";

export const HomePageContainer = () => {
  return (
    <div className="homeContainer">
      <Header />
      <Home />
    </div>
  );
};
