import React, { useContext, useState } from "react";
import interact from "interactjs";
import { AppContext, Devices } from "../../context/AppContext";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./SmartDeviceDetails.css";

export const SmartDeviceDetails = () => {
  const { data, deviceIndex, currentPosition, setCurrentPosition } =
    useContext(AppContext);
  const position = { x: currentPosition.x, y: currentPosition.y };

  interact(".dragg-resize").draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        setCurrentPosition({ x: position.x, y: position.y });
      },
    },
  });

  const handleSelectedItem = (selectedItem: Devices) => {
    let { id, ...newSelectedItem } = selectedItem;
    const deviceDetails = Object.keys(newSelectedItem).map((key: string) => {
      if (newSelectedItem[key] === true) {
        return (
          <>
            <span className="infoTypes">{key}: </span>
            <BsCheckLg color="#038a03" fontSize={14} />
          </>
        );
      }
      if (newSelectedItem[key] === false) {
        return (
          <>
            <span className="infoTypes">{key}: </span>
            <AiOutlineClose
              style={{ marginBottom: "-3px" }}
              color="#ff0000"
              fontSize={18}
            />
          </>
        );
      }
      return (
        <p className="detailInfo" key={key}>
          <span className="infoTypes">{key}: </span>
          {newSelectedItem[key]}
        </p>
      );
    });
    return deviceDetails;
  };

  return (
    <div
      className="deviceDetails dragg-resize"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {data &&
        data !== null &&
        data.map((item) => {
          return item.id === deviceIndex ? handleSelectedItem(item) : null;
        })}
    </div>
  );
};
