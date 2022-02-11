import React, { useContext } from "react";
import { SmartDevice } from "../smartDevice/SmartDevice";
import { AppContext } from "../../context/AppContext";
import "./DevicesArea.css";

export const DevicesArea: React.FC = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="deviceArea">
      {data &&
        data !== null &&
        data.map((item) => {
          return (
            <SmartDevice
              key={item.id}
              name={item.name}
              type={item.type}
              connectionState={item.connectionState}
              id={item.id}
            />
          );
        })}
    </div>
  );
};
