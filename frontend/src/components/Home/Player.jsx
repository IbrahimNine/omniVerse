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
          viewBox="0 0 20 20"
          className="refreshYoutube"
          onClick={nextYoutubeResult}
        >
          <path
            fill="currentColor"
            d="M5.5 10a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9m-2.353 4.854l-.003-.003A.498.498 0 0 1 3 14.503v-.006a.498.498 0 0 1 .146-.35l2-2a.5.5 0 0 1 .708.707L4.707 14H7.5a.5.5 0 0 1 0 1H4.707l1.147 1.146a.5.5 0 0 1-.708.708zM2 5.75A.75.75 0 0 1 2.75 5h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 5.75m0 3A.75.75 0 0 1 2.75 8h14.5a.75.75 0 0 1 0 1.5H7.794A5.48 5.48 0 0 0 5.5 9a5.48 5.48 0 0 0-2.294.5H2.75A.75.75 0 0 1 2 8.75m8.91 6.75h6.34a.75.75 0 0 0 0-1.5h-6.272a5.586 5.586 0 0 1-.069 1.5m-.285-3h6.625a.75.75 0 0 0 0-1.5H9.743c.368.446.668.952.882 1.5"
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
          <abbr title="Show played album">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="showOnQueue"
            >
              <path
                fill="currentColor"
                d="M15.784 19q-.996 0-1.688-.69t-.692-1.675q0-1.002.695-1.703q.696-.701 1.69-.701q.384 0 .733.143q.35.143.651.384V7.73q0-.31.21-.52q.21-.211.52-.211h2.366q.31 0 .52.21q.211.21.211.52q0 .31-.21.52q-.21.212-.52.212h-2.097v8.173q0 .985-.697 1.675q-.697.69-1.692.69M4.5 14.77q-.213 0-.356-.145T4 14.27q0-.213.144-.357q.143-.143.356-.143h6.038q.213 0 .357.144t.143.357q0 .213-.143.356t-.357.143zm0-3.385q-.213 0-.356-.144T4 10.884q0-.213.144-.356q.143-.143.356-.143h9.788q.213 0 .357.144q.143.143.143.356t-.143.356q-.144.144-.357.144zM4.5 8q-.213 0-.356-.144T4 7.499q0-.212.144-.356Q4.288 7 4.5 7h9.788q.213 0 .357.144q.143.144.143.357q0 .212-.143.356Q14.5 8 14.288 8z"
              ></path>
            </svg>
          </abbr>
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
