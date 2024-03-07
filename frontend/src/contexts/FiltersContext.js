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
  const [isPagedArtists, setIsPagedArtists] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

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
              Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
            },
          }
        )
        .then((res) => {
          setIsPagedArtists(res.data.pagination.pages > 1);
          setFilteredData(res.data.results);
          // console.log(res.data.pagination);
        })
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchingdata();
  }, [filterSet, filterBy, globalSearch, discogsKey, discogsSecretKey]);

  const fetchMoreData = () => {
    setLoading(true);
    axios
      .get(
        `https://api.discogs.com/database/search?q=${
          globalSearch ? globalSearch : ""
        }&type=${filterBy}&style=${
          filterSet.style ? filterSet.style : ""
        }&decade=${filterSet.decade ? filterSet.decade : ""}&year=${
          filterSet.year ? filterSet.year : ""
        }&page=${pageNumber}`,
        {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        }
      )
      .then((res) => {
        setFilteredData([...filteredData ,...res.data.results]);
        setIsPagedArtists(res.data.pagination.pages > pageNumber);
        setPageNumber(pageNumber + 1);
        setLoading(false);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

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
        isPagedArtists,
        fetchMoreData,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
