import React, { useCallback, useEffect } from "react";
import "./FilteredItems.css";
import { useFiltersContext } from "../../contexts/FiltersContext";
import Album from "../Artist/Album";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import FilteredItem from "./FilteredItem";

function FilteredItems() {
  const { fetchMoreData, isPagedArtists, filteredData, loading } =
    useFiltersContext();
  const { showDetails, showTracksAlone } = useReleaseContext();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const offset = 10;
    const hasScrolledToBottom =
      scrollTop + clientHeight + offset >= scrollHeight;
    if (hasScrolledToBottom && isPagedArtists) {
      fetchMoreData();
    }
  }, [isPagedArtists, fetchMoreData]);

  useEffect(() => { 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="FilteredItems" onScroll={handleScroll}>
      {filteredData &&
        filteredData.map((item) => {
          return (
            <FilteredItem
              key={item.id}
              item={item}
              showTracksAlone={showTracksAlone}
            />
          );
        })}
      {loading && (
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt="loading"
          width={"30%"}
          className="loadingGif"
        />
      )}
      {showDetails && <Album />}
    </div>
  );
}

export default FilteredItems;
