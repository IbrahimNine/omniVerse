import "./Album.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { Link } from "react-router-dom";
import Track from "./Track";

function Album() {
  const { releaseCord, releaseData, showDetails, setShowDetails } =
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
              src={releaseData.images && releaseData.images[0]?.uri}
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
      <div className="releaseTrackListWrapper">
        <div className="releaseTrackList">
          {releaseData ? (
            releaseData.tracklist.map((item, index) => (
              <Track
                key={index}
                index={index}
                item={item}
                artists_sort={releaseData.artists_sort}
              />
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
    </div>
  );
}

export default Album;
