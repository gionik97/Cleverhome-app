import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createContext,
} from "react";

export interface Devices {
  id: string;
  type: string;
  name: string;
  connectionState: string;
  [key: string]: string | number | boolean;
}

interface AppContextInterface {
  data: null | Devices[];
  details: boolean;
  showDetails: (currentId: string) => void;
  deviceIndex: string | null;
  setDeviceIndex: Dispatch<SetStateAction<string | null>>;
  currentPosition: { x: number; y: number };
  setCurrentPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  active: boolean;
}

const contextDefaultValues: AppContextInterface = {
  data: [],
  details: false,
  showDetails: (): void => {},
  deviceIndex: null,
  setDeviceIndex: (): void => {},
  currentPosition: { x: 0, y: 0 },
  setCurrentPosition: (): void => {},
  active: false,
};

export const AppContext =
  createContext<AppContextInterface>(contextDefaultValues);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [details, setDetails] = useState<boolean>(contextDefaultValues.details);
  const [data, setData] = useState<null | Devices[]>(contextDefaultValues.data);
  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  }>(contextDefaultValues.currentPosition);
  const [deviceIndex, setDeviceIndex] = useState<string | null>(
    contextDefaultValues.deviceIndex
  );
  const [active, setActive] = useState<boolean>(contextDefaultValues.active);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const showDetails = (currentId: string): void => {
    if (details && currentId === deviceIndex) {
      setDetails(false);
      setActive(false);
    } else {
      setDetails(true);
      setDeviceIndex(currentId);
      setActive(true);
    }
  };

  const value: AppContextInterface = {
    data,
    details,
    showDetails,
    deviceIndex,
    setDeviceIndex,
    currentPosition,
    setCurrentPosition,
    active,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
