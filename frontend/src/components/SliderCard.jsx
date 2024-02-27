import React from "react";

function SliderCard({item}) {
  return (
    <div className="SliderCard">
      <img src={item.cover_image} alt="pic" />
      <h4>{item.title}</h4>
    </div>
  );
}

export default SliderCard;
