import React from "react";
import "./FilteredItems.css";
import { useFiltersContext } from "../contexts/FiltersContext";

function FilteredItems() {
  const { filteredData, loading } = useFiltersContext();

  return (
    <div className="FilteredItems">
      {filteredData && !loading ? (
        filteredData.map((item) => {
          return (
            <div key={item.id} className="ItemCard">
              <img src={item.cover_image} alt="pic" />
              <abbr title={item.title}>
                <h4>
                  {item.title.slice(0, 45)}
                  {item.title.length > 45 && "..."}
                </h4>
              </abbr>
            </div>
          );
        })
      ) : (
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt="loading"
          width={"30%"}
        />
      )}
    </div>
  );
}

export default FilteredItems;
