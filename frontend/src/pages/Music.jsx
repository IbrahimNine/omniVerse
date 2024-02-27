import React, { useState } from "react";
import Offcanvas from "../components/Offcanvas";
import FilteredItems from "../components/FilteredItems";

function Music() {
 const [filterBy, setFilterBy] = useState("artist");

  return (
    <div className="Music">
      <Offcanvas />
      <div className="contents">
        <div className="FilteringBtns">
          <button type="button" onClick={() => setFilterBy("artist")}>
            Artists
          </button>
          <button type="button" onClick={() => setFilterBy("master")}>
            Albums
          </button>
        </div>
        <FilteredItems filterBy={filterBy} />
      </div>
    </div>
  );
}

export default Music;
