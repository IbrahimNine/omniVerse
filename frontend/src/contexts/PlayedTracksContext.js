import { createContext, useContext } from "react";

const PlayedTracksContext = createContext();
export const usePlayedTracksConext = () => useContext(PlayedTracksContext);

export const PlayedTracksProvider = ({ children }) => {

    
  return (
    <PlayedTracksContext.Provider value>
      {children}
    </PlayedTracksContext.Provider>
  );
};
