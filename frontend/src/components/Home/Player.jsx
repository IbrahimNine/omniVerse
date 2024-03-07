import "./Player.css";
import ReactPlayer from "react-player";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useRef, useState } from "react";

function Player() {
  const { trackData, play, handlePlaying } = useReleaseContext();
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


  return (
    <div className="omniVersePlayer">
      <img
        className="TrackCover"
        src={`https://img.youtube.com/vi/${trackData.id}/default.jpg`}
        alt="Track cover thumbnail"
        // height={"80%"}
      />
      <button className="play-pause" onClick={handlePlaying}>
        {play ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16M96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"
            ></path>
          </svg>
        )}
      </button>
      <ReactPlayer
        className="omniVersePlayer"
        url={`https://www.youtube.com/watch?v=${trackData.id}`}
        width={0}
        height={0}
        playing={play}
        volume={volume / 100}
        muted={volume === 0}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handlePlaying}
        ref={playerRef}
      />
      <div className="progressBar">
        <span>{trackData.title}</span>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
        <span>
          <span>{`${formatTime(Math.floor(played * duration))}/${formatTime(
            duration
          )}`}</span>
        </span>
      </div>
      <div className="volumeSet">
        <span>Volume</span>
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
