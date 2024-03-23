import "./Player.css";
import ReactPlayer from "react-player/lazy";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useRef, useState } from "react";

function Player() {
  const {
    trackData,
    play,
    handlePlaying,
    nextOnQueue,
    previousOnQueue,
    nextYoutubeResult,
    showTracks,
    setPlay,
    setPlayTrack,
    playerLoading,
  } = useReleaseContext();
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

  const trackEnding = () => {
    handlePlaying();
    nextOnQueue();
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 133) {
      event.preventDefault();
      handlePlaying();
    }
  };

  return (
    <div className="omniVersePlayer">
      <a
        href={`https://www.youtube.com/watch?v=${trackData.id}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          setPlay(false);
          setPlayTrack(false);
        }}
      >
        <img
          className="TrackCover"
          src={`https://img.youtube.com/vi/${trackData.id}/default.jpg`}
          alt="Track cover thumbnail"
        />
      </a>
      <abbr title="Next Youtube results">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 14 14"
          className="refreshYoutube"
          onClick={nextYoutubeResult}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.883.046a4.368 4.368 0 0 0-4.582 2.717a3.693 3.693 0 0 0-.732 7.184a4.501 4.501 0 0 1 6.726-3.083a2 2 0 0 1 2.583 2.56l-.207.563a3.23 3.23 0 0 0 .015-6.192A4.368 4.368 0 0 0 7.883.046M7 8.986a1.75 1.75 0 1 0 1.132 3.084a.75.75 0 0 1 .971 1.143a3.25 3.25 0 1 1 .102-4.865l.397-.248a.75.75 0 0 1 1.102.894l-.545 1.487a.742.742 0 0 1-.173.279a.744.744 0 0 1-.68.212l-1.433-.247a.75.75 0 0 1-.27-1.375l.238-.15A1.743 1.743 0 0 0 7 8.987Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </abbr>
      <button
        type="button"
        className="previousOnQueue"
        onClick={previousOnQueue}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3.885 21.06a.76.76 0 0 1-.75-.75V3.69a.75.75 0 0 1 1.5 0v16.6a.75.75 0 0 1-.75.77m16.98-15.713v13.25a2.35 2.35 0 0 1-.32 1.13a2.2 2.2 0 0 1-1.89 1.07h-.1a2.089 2.089 0 0 1-1.11-.36l-9.13-6.12a2.25 2.25 0 0 1-.71-.76a2.29 2.29 0 0 1-.27-1a2.18 2.18 0 0 1 .2-1a2.22 2.22 0 0 1 .64-.81l9.14-7.09a2.22 2.22 0 0 1 1.13-.44a2.2 2.2 0 0 1 2.09 1.02c.204.335.318.718.33 1.11"
          ></path>
        </svg>
      </button>
      <button
        className="play-pause"
        onClick={() => {
          if (!playerLoading) {
            handlePlaying();
          }
        }}
        onKeyDown={() => {
          if (!playerLoading) {
            handleKeyDown();
          }
        }}
      >
        {playerLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
            >
              <path
                strokeDasharray={60}
                strokeDashoffset={60}
                strokeOpacity={0.3}
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="1.3s"
                  values="60;0"
                ></animate>
              </path>
              <path
                strokeDasharray={15}
                strokeDashoffset={15}
                d="M12 3C16.9706 3 21 7.02944 21 12"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.3s"
                  values="15;0"
                ></animate>
                <animateTransform
                  attributeName="transform"
                  dur="1.5s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                ></animateTransform>
              </path>
            </g>
          </svg>
        ) : play ? (
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
      <button type="button" className="nextOnQueue" onClick={nextOnQueue}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.095 21a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.5 0v16.5a.74.74 0 0 1-.75.75m-3.4-9.589a2.25 2.25 0 0 1-.85 1.82l-9.11 7.09c-.326.247-.713.4-1.12.44h-.23a2.142 2.142 0 0 1-1-.22a2.201 2.201 0 0 1-.9-.81a2.17 2.17 0 0 1-.33-1.16V5.421a2.22 2.22 0 0 1 .31-1.12a2.25 2.25 0 0 1 .85-.8a2.18 2.18 0 0 1 2.24.1l9.12 6.08c.29.191.53.448.7.75a2.3 2.3 0 0 1 .32.98"
          ></path>
        </svg>
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
        onEnded={trackEnding}
        ref={playerRef}
      />
      <div className="progressBar">
        <span
          onClick={() => {
            trackData.releaseData && showTracks(trackData.releaseData);
          }}
          className="toShowAlbum"
        >
          {trackData.title}
        </span>
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
