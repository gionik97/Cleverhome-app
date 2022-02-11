import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./SmartDevice.css";

export interface DeviceProps {
  id: string;
  type: string;
  name: string;
  connectionState: string;
}

export const SmartDevice: React.FC<DeviceProps> = ({
  id,
  type,
  name,
  connectionState,
}) => {
  const { showDetails, active, deviceIndex } = useContext(AppContext);

  const handleConnectionType = (connectionState: string) => {
    if (connectionState === "connected") {
      return "connected";
    }
    if (connectionState === "poorConnection") {
      return "poorConnection";
    }
    if (connectionState === "disconnected") {
      return "disconnected";
    }
  };

  return (
    <div
      className={"device " + (id === deviceIndex && active ? "active" : "")}
      onClick={() => showDetails(id)}
    >
      <p>{name}</p>
      <p>{type}</p>
      <p className={handleConnectionType(connectionState)}>{connectionState}</p>
    </div>
  );
};
