import React, { useEffect } from "react";
import Offcanvas from "../components/Music/Offcanvas";
import FilteredItems from "../components/Music/FilteredItems";
import { useFiltersContext } from "../contexts/FiltersContext";
import "./Music.css";

function Music({ isVisible }) {
  const { filterBy, setFilterBy } = useFiltersContext();

  useEffect(() => {
    const buttons = document.querySelectorAll(".FilteringBtns button");
    buttons.forEach((button) => {
      if (button.id === filterBy) {
        button.style.backgroundColor = "white";
        button.style.color = "black";
      } else {
        button.style.backgroundColor = "black";
        button.style.color = "white";
      }
    });
  }, [filterBy]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `Music | ${document.title}`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="Music" style={isVisible ? null : { height: "100vh", overflow:"hidden" }}>
      <Offcanvas />
      <div className="contents">
        <div className="FilteringBtns">
          <button
            id="artist"
            type="button"
            onClick={() => setFilterBy("artist")}
          >
            Artists
          </button>
          <button
            id="master"
            type="button"
            onClick={() => setFilterBy("master")}
          >
            Albums
          </button>
        </div>
        <FilteredItems />
      </div>
    </div>
  );
}

export default Music;
