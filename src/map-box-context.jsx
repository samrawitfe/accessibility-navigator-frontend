import React, { createContext, useState, useContext } from "react";

const MapboxContext = createContext();

export const MapboxProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || ""
  );

  return (
    <MapboxContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </MapboxContext.Provider>
  );
};

export const useMapboxAccessToken = () => {
  return useContext(MapboxContext);
};
