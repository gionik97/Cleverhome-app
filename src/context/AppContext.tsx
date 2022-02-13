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
  smartDeviceDetails: any;
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
  smartDeviceDetails: {},
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
  const [smartDeviceDetails, setSmartDeviceDetails] = useState();
  console.log("data from mirage", data);
  console.log("data 2 from mirage", smartDeviceDetails);

  const getDevices = () => {
    fetch("api/devices", {})
      .then((response) => response.json())
      .then((json) => setData(json.devices));
  };
  const getDeviceDetails = (currentId: string) => {
    fetch(`api/devices/${currentId}`, {})
      .then((response) => response.json())
      .then((json) => setSmartDeviceDetails(json));
  };

  useEffect(() => {
    getDevices();
  }, []);

  const showDetails = (currentId: string): void => {
    if (details && currentId === deviceIndex) {
      setDetails(false);
      setActive(false);
    } else {
      setDetails(true);
      setDeviceIndex(currentId);
      setActive(true);
      getDeviceDetails(currentId);
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
    smartDeviceDetails,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
