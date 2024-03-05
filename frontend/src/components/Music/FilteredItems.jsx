import React, { useCallback, useEffect } from "react";
import "./FilteredItems.css";
import { useFiltersContext } from "../../contexts/FiltersContext";
import { Link } from "react-router-dom";
import Album from "../Artist/Album";
import { useReleaseContext } from "../../contexts/ReleaseContext";

function FilteredItems() {
  const { fetchMoreData, isPagedArtists, filteredData, loading, filterBy } =
    useFiltersContext();
  const { showDetails, showTracksAlone } = useReleaseContext();

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const hasScrolledToBottom = scrollTop + clientHeight === scrollHeight;
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

  console.log(filteredData);
  return (
    <div className="FilteredItems" onScroll={handleScroll}>
      {filteredData && !loading ? (
        filteredData.map((item) => {
          return (
            <Link
              key={item.id}
              to={filterBy === "artist" ? `/artist/${item.id}` : ""}
              onClick={filterBy === "master" && (() => showTracksAlone(item))}
            >
              <div className="ItemCard">
                <img src={item.cover_image} alt="pic" />
                <abbr title={item.title}>
                  <h4>
                    {item.title.slice(0, 45)}
                    {item.title.length > 45 && "..."}
                  </h4>
                </abbr>
              </div>
            </Link>
          );
        })
      ) : (
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt="loading"
          width={"30%"}
        />
      )}
      {showDetails && <Album />}
    </div>
  );
}

export default FilteredItems;
