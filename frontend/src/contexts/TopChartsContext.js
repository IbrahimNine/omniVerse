import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const topChartsContext = createContext();
export const useTopChartsContext = () => useContext(topChartsContext);

export function TopChartsProvider({ children }) {
  const [result, setResult] = useState(null);
  const [filteredBy, setFilteredBy]= useState();

  useEffect(() => {
    const fetchingdata = () => {
      axios
        .get(
          `https://api.discogs.com/database/search?sort=score%2Cdesc&type=${filteredBy}`,
          {
            headers: {
              Authorization:
                "Discogs key=xBEiSwfcQkjcycUzXMUF, secret=HHKoetIzHBaFyPnOauCjSBZcHhxtKrYH",
            },
          }
        )
        .then((res) => setResult(res.data.results))
        .catch((err) => console.log(err));
    };
    fetchingdata();
  }, [filteredBy]);

  return (
    <topChartsContext.Provider value={{ result, setFilteredBy }}>
      {children}
    </topChartsContext.Provider>
  );
}
