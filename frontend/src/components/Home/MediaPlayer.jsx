import React, { useCallback, useEffect, useRef } from "react";
import "./MediaPlayer.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";

function MediaPlayer() {
  const { trackData, played, setPlayed, playerRef } = useReleaseContext();
  const intervalIdRef = useRef(null);

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
      const newColor = getRandomColor();
      document.querySelector(".MediaPlayer").style.backgroundColor = newColor;
    };
    changeBackgroundColor();
    intervalIdRef.current = setInterval(changeBackgroundColor, 30000);
  }, []);

  useEffect(() => {
    startBackgroundChanger();
    return () => clearInterval(intervalIdRef.current);
  }, [startBackgroundChanger]);

  return (
    <div className="MediaPlayer">
      <div id="albumImageWrapper">
        <img
          src={trackData?.releaseData?.images[0].uri || "/default3.png"}
          alt=""
        />
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={handleSeekChange}
      />
    </div>
  );
}

export default MediaPlayer;
