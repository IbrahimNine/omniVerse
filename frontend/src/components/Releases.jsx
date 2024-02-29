import { useState } from "react";
import "./Releases.css";
import axios from "axios";

function Releases({ release }) {
  const [releaseData, setReleaseData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  const showTracks = () => {
    if (!showDetails) {
      axios
        .get(`https://api.discogs.com/releases/${release.main_release}`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => {
          setReleaseData(res.data.tracklist);
        })
        .catch((err) => console.log(err));
    }
    setShowDetails(!showDetails);
  };

  return (
    <div className="Releases">
      <div className="release" onClick={showTracks}>
        <h5>Title: {release.title}</h5>
        <h5>Release year: {release.year}</h5>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <g transform="rotate(-90 12 12)">
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray={10}
              strokeDashoffset={10}
              strokeLinecap="round"
              strokeWidth={2}
              d="M8 12L15 5M8 12L15 19"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.3s"
                values="10;0"
              ></animate>
            </path>
          </g>
        </svg>
      </div>
      {showDetails && (
        <div className="releaseDetails">
          {releaseData ? (
            releaseData.map((item, index) => (
              <div key={index}>
                <p>{item.position}</p>
                <p>{item.title}</p>
                <p>{item.duration}</p>
              </div>
            ))
          ) : (
            <p>...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Releases;
