import "./Album.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { Link } from "react-router-dom";
import Track from "./Track";
import { useCollectionsContext } from "../../contexts/CollectionsContext";
import { useAuthContext } from "../../contexts/AuthContext";

function Album() {
  const { releaseCord, releaseData, showDetails, setShowDetails } =
    useReleaseContext();
  const { user } = useAuthContext();
  const {
    setShowNewCollectionName,
    setNewCollection,
    setShowUserCollectionsList,
    setItemToCollect,
  } = useCollectionsContext();

  const handleShowDetails = (e) => {
    if (e.target.className === "contentsWrapper Album") {
      setShowDetails(!showDetails);
    }
  };

  const bgStyling = {
    backgroundImage: `url(${
      releaseData?.images && releaseData.images[0]?.uri
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="contentsWrapper Album" onClick={handleShowDetails}>
      <div className="releaseTrackListWrapper " style={bgStyling}>
        <div className="fakeLayer">
          <div className="releaseDetails">
            {releaseData ? (
              <>
                <img
                  id="albumCover"
                  src={
                    releaseData.images && releaseData.images[0]?.uri
                      ? releaseData.images && releaseData.images[0]?.uri
                      : "/default3.png"
                  }
                  alt="Album cover"
                />
                <div className="albumGenerals">
                  <div className="albumTitleAndArtist">
                    <h3>{releaseData.title}</h3>
                    <Link
                      className="ArtistName"
                      to={`/artist/${releaseData?.artists[0]?.id}`}
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      <h2>
                        {releaseCord && releaseCord.artist
                          ? releaseCord.artist
                          : releaseData && releaseData.artists_sort}
                      </h2>
                    </Link>
                  </div>
                  <div className="AlbumDetails">
                    <div className="genres">
                      Genre(s):&nbsp;
                      {releaseData.styles?.map((item, i) => (
                        <h5 key={i}>{item} </h5>
                      ))}
                    </div>
                    <h5>Released: {releaseData.released}</h5>
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
            <div className="btns">
              {user && (
                <div className="collectionBtns">
                  <abbr title="Add to a new Collection">
                    <button
                      className="bookmarkingBtn"
                      type="button"
                      onClick={() => {
                        setShowNewCollectionName(true);
                        setNewCollection({
                          elements: [
                            {
                              elementID: `${releaseData.id}`,
                              elementPic:
                                releaseData.images && releaseData.images[0]?.uri
                                  ? releaseData.images[0]?.uri
                                  : "/default3.png",
                              elementTitle: releaseData.title,
                              isArtist: false,
                            },
                          ],
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M16 8h3zM5 8h8.45H13h.35zm.4-2h13.2l-.85-1H6.25zm4.6 6.75l2-1l2 1V8h-4zM14.55 21H5q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675v4.9q-.475-.175-.975-.275T19 11.05V8h-3v3.825q-.875.5-1.525 1.238t-1.025 1.662L12 14l-4 2V8H5v11h8.35q.2.575.5 1.075t.7.925M18 21v-3h-3v-2h3v-3h2v3h3v2h-3v3z"
                        ></path>
                      </svg>
                    </button>
                  </abbr>
                  <abbr title="Add to an existing Collection">
                    <button
                      className="bookmarkingBtn"
                      type="button"
                      onClick={() => {
                        setShowUserCollectionsList(true);
                        setItemToCollect([
                          {
                            elementID: `${releaseData.id}`,
                            elementPic:
                              releaseData.images && releaseData.images[0]?.uri
                                ? releaseData.images[0]?.uri
                                : "/default3.png",
                            elementTitle: releaseData.title,
                            isArtist: false,
                          },
                        ]);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M3 21V5.8L5.3 3h13.4L21 5.8v5.625q-.475-.175-.975-.288T19 11.026q-.825 0-1.587.188T16 11.8V8H8v8l4-2l1.45.725q-.2.525-.325 1.088T13 16.975q0 1.125.4 2.163T14.55 21zm15 0v-3h-3v-2h3v-3h2v3h3v2h-3v3zM5.4 6h13.2l-.85-1H6.25z"
                        ></path>
                      </svg>
                    </button>
                  </abbr>
                </div>
              )}
            </div>
          </div>
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
    </div>
  );
}

export default Album;
