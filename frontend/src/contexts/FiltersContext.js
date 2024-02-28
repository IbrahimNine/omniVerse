import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const FiltersContext = createContext();
export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [filterSet, setFilterSet] = useState({});
  const [filteredData, setFilteredData] = useState();
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterBy, setFilterBy] = useState("artist");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingdata = () => {
      setLoading(true);
      axios
        .get(
          `https://api.discogs.com/database/search?q=${
            globalSearch ? globalSearch : ""
          }&type=${filterBy}&style=${
            filterSet.style ? filterSet.style : ""
          }&decade=${filterSet.decade ? filterSet.decade : ""}&year=${
            filterSet.year ? filterSet.year : ""
          }`,
          {
            headers: {
              Authorization:
                "Discogs key=xBEiSwfcQkjcycUzXMUF, secret=HHKoetIzHBaFyPnOauCjSBZcHhxtKrYH",
            },
          }
        )
        .then((res) => setFilteredData(res.data.results))
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchingdata();
  }, [filterSet, filterBy, globalSearch]);

  return (
    <FiltersContext.Provider
      value={{
        filterSet,
        setFilterSet,
        globalSearch,
        setGlobalSearch,
        filterBy,
        setFilterBy,
        filteredData,
        loading,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
