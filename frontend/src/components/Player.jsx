import "./Player.css";
import ReactPlayer from "react-player";
import { useReleaseContext } from "../contexts/ReleaseContext";
import { useRef, useState } from "react";

function Player() {
  const { play, handlePlaying } = useReleaseContext();
  const [volume, setVolume] = useState(90);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(null);
  const playerRef = useRef(null);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo, "fraction");
  };
  const handleProgress = (progress) => {
    if (!isNaN(progress.played)) {
      setPlayed(progress.played);
    }
  };
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (time) => {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "Loading...";
  };

  const formatTimeUpadating = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(2)}`;
  };

  return (
    <div className="omniVersePlayer">
      <button onClick={handlePlaying}>
        {play ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 1200 1200"
          >
            <path
              fill="currentColor"
              d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"
            ></path>
          </svg>
        )}
      </button>
      <ReactPlayer
        className="omniVersePlayer"
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        width={0}
        height={0}
        playing={play}
        volume={volume / 100}
        muted={volume === 0}
        onProgress={handleProgress}
        onDuration={handleDuration}
        ref={playerRef}
      />
      <div className="progressBar">
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
        <span>
          <span>{`${formatTimeUpadating(played)}/${formatTime(
            duration
          )}`}</span>
        </span>
      </div>
      <div className="volumeSet">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleVolumeChange}
        />
        <span>{volume}%</span>
      </div>
    </div>
  );
}

export default Player;
