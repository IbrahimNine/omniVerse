import React, { useState, useEffect } from "react";
import "./TopChart.css";
import SliderCard from "./SliderCard";
import axios from "axios";

function TopChart({ filterBy }) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [result, setResult] = useState(null);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  useEffect(() => {
    const fetchingdata = () => {
      axios
        .get(
          `https://api.discogs.com/database/search?sort=hot%2Cdesc&type=${filterBy}`,
          {
            headers: {
              Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
            },
          }
        )
        .then((res) => setResult(res.data.results))
        .catch((err) => console.log(err));
    };
    fetchingdata();
  }, [filterBy, discogsKey, discogsSecretKey]);

  const handleNext = () => {
    const elementWidth =
      document.querySelector(".slider-container").offsetWidth;
    const element2Width =
      document.querySelector(".slider-contents").offsetWidth;
    if (elementWidth < element2Width + sliderPosition)
      setSliderPosition(sliderPosition - 200);
  };
  const handlePrevious = () => {
    if (sliderPosition !== 0) setSliderPosition(sliderPosition + 200);
  };

  return (
    <div className="TopChart Slider">
      <h2>Top {filterBy === "artist" ? "artists" : "Albums"}:</h2>
      <button type="Button" onClick={handlePrevious}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <circle
              cx={12}
              cy={12}
              r={9}
              strokeDasharray={60}
              strokeDashoffset={60}
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.5s"
                values="60;0"
              ></animate>
            </circle>
            <path strokeDasharray={12} strokeDashoffset={12} d="M17 12H7.5">
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.6s"
                dur="0.2s"
                values="12;0"
              ></animate>
            </path>
            <path
              strokeDasharray={8}
              strokeDashoffset={8}
              d="M7 12L11 16M7 12L11 8"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.8s"
                dur="0.2s"
                values="8;0"
              ></animate>
            </path>
          </g>
        </svg>
      </button>
      <div className="slider-container">
        <div
          className="slider-contents"
          style={{ transform: `translateX(${sliderPosition}px)` }}
        >
          {result &&
            result.map((item) => <SliderCard key={item.id} item={item} />)}
        </div>
      </div>
      <button type="Button" onClick={handleNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <g transform="translate(24 0) scale(-1 1)">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            >
              <circle
                cx={12}
                cy={12}
                r={9}
                strokeDasharray={60}
                strokeDashoffset={60}
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.5s"
                  values="60;0"
                ></animate>
              </circle>
              <path strokeDasharray={12} strokeDashoffset={12} d="M17 12H7.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.6s"
                  dur="0.2s"
                  values="12;0"
                ></animate>
              </path>
              <path
                strokeDasharray={8}
                strokeDashoffset={8}
                d="M7 12L11 16M7 12L11 8"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.8s"
                  dur="0.2s"
                  values="8;0"
                ></animate>
              </path>
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default TopChart;
