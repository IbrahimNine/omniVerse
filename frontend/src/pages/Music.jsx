import React, { useEffect } from "react";
import Offcanvas from "../components/Music/Offcanvas";
import FilteredItems from "../components/Music/FilteredItems";
import { useFiltersContext } from "../contexts/FiltersContext";

function Music() {
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

  return (
    <div className="Music">
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
