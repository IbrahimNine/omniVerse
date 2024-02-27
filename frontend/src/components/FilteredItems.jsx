import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FilteredItems.css";

function FilteredItems({ filterBy }) {
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    const fetchingdata = () => {
      axios
        .get(
          `https://api.discogs.com/database/search?sort=score%2Cdesc&type=${filterBy}`,
          {
            headers: {
              Authorization:
                "Discogs key=xBEiSwfcQkjcycUzXMUF, secret=HHKoetIzHBaFyPnOauCjSBZcHhxtKrYH",
            },
          }
        )
        .then((res) => setFilteredData(res.data.results))
        .catch((err) => console.log(err));
    };
    fetchingdata();
  }, [filterBy]);
  return (
    <div className="FilteredItems">
      {!filteredData && (
        <img
          src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
          alt="loading"
          width={"30%"}
        />
      )}
      {filteredData &&
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
        })}
    </div>
  );
}

export default FilteredItems;
