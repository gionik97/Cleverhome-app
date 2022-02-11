import React, { useContext } from "react";
import { SmartDeviceDetails } from "../smartDeviceDetails/SmartDeviceDetails";
import { AppContext } from "../../context/AppContext";
import "./DetailArea.css";

export const DetailArea = () => {
  const { details } = useContext(AppContext);

  return <div className="detailArea">{details && <SmartDeviceDetails />}</div>;
};
