import "./Album.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { Link } from "react-router-dom";

function Album() {
  const { play, releaseCord, releaseData, showDetails, setShowDetails } =
    useReleaseContext();

  const handleShowDetails = (e) => {
    if (e.target.className === "contentsWrapper Album") {
      setShowDetails(!showDetails);
    }
  };

  return (
    <div className="contentsWrapper Album" onClick={handleShowDetails}>
      <div className="releaseDetails">
        {releaseData ? (
          <>
            <img
              id="albumCover"
              src={releaseData.images[0]?.uri}
              alt="Album cover"
            />
            <div>
              <h2>{releaseData.title}</h2>
              <Link
                to={`/artist/${releaseData?.artists[0]?.id}`}
                onClick={() => setShowDetails(!showDetails)}
              >
                <h2>
                  {releaseCord && releaseCord.artist
                    ? releaseCord.artist
                    : releaseData && releaseData.artists_sort}
                </h2>
              </Link>
              <div className="AlbumDetails">
                <h5>Released: {releaseData.released}</h5>
                <div className="genres">
                  Genre(s):&nbsp;
                  {releaseData.styles?.map((item, i) => (
                    <h5 key={i}>{item} </h5>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
            alt="loading"
            width={50}
          />
        )}
      </div>
      <div className="releaseTrackList">
        {releaseData ? (
          releaseData.tracklist.map((item, index) => (
            <div key={index} className="track">
              <div className="track-details">
                <p>{item.position}</p>
                <p>{item.title}</p>
                <p>{item.duration}</p>
              </div>
              <div className="controlsWrapper">
                <button className="controls">
                  <abbr title="Play/Pause">
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
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                        ></path>
                      </svg>
                    )}
                  </abbr>
                </button>
                <button className="controls">
                  <abbr title="Download">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M6.697 6.697a7.5 7.5 0 0 1 12.794 4.927A4.002 4.002 0 0 1 18.5 19.5h-12a5 5 0 0 1-1.667-9.715a7.47 7.47 0 0 1 1.864-3.088m4.596 9.01a1 1 0 0 0 1.414 0l2-2a1 1 0 0 0-1.414-1.414l-.293.293V9a1 1 0 1 0-2 0v3.586l-.293-.293a1 1 0 0 0-1.414 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </abbr>
                </button>
              </div>
            </div>
          ))
        ) : (
          <img
            id="tracksLoading"
            src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
            alt="loading"
            width={50}
          />
        )}
      </div>
    </div>
  );
}

export default Album;
