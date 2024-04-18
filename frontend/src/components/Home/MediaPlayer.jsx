import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MediaPlayer.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";

function MediaPlayer() {
  const { trackData, played, setPlayed, playerRef } = useReleaseContext();
  const intervalIdRef = useRef(null);
  const [bgColorArray, setBgColorArray] = useState([
    "#00000080",
    "#00000080",
    "#00000080",
    "#00000080",
  ]);

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo, "fraction");
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const startBackgroundChanger = useCallback(() => {
    const changeBackgroundColor = () => {
      const newColors = bgColorArray.map(() => getRandomColor());
      setBgColorArray(newColors); // Update the state with new colors
    };

    intervalIdRef.current = setInterval(changeBackgroundColor, 10000);
  }, [bgColorArray]);

  useEffect(() => {
    startBackgroundChanger();
    return () => clearInterval(intervalIdRef.current);
  }, [startBackgroundChanger]);

  return (
    <div
      className="MediaPlayerWrapper"
      // style={{
      //   backgroundImage: `linear-gradient(to top, transparent 0.1%, black 100%), url(${
      //     trackData?.releaseData?.images[0].uri || null
      //   })`,
      // }}
    >
      <div className="bgColorsContainer">
        {bgColorArray.map((color, index) => (
          <div
            className="bgColor"
            id={`bgColor${index + 1}`}
            style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}
            key={index}
          />
        ))}
      </div>
      <div className="MediaPlayer">
        <div id="albumImageWrapper">
          <img
            src={trackData?.releaseData?.images[0].uri || "/default3.png"}
            alt=""
          />
        </div>
        <h1 className="TrackTitle">{trackData.originalTitle}</h1>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          disabled
        />
      </div>
    </div>
  );
}

export default MediaPlayer;
