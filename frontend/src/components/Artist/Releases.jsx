import "./Releases.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";
import { useCollectionsContext } from "../../contexts/CollectionsContext";

function Releases({ release }) {
  const { showTracks } = useReleaseContext();
  const {
    setShowNewCollectionName,
    setNewCollection,
    setShowUserCollectionsList,
    setItemToCollect,
  } = useCollectionsContext();

  const handleNewCollection = (e) => {
    let targetElement = e.target;
    while (targetElement && targetElement !== e.currentTarget) {
      if (targetElement.classList.contains("bookmarkingBtn")) {
        return;
      }
      targetElement = targetElement.parentNode;
    }
    showTracks(release);
  };

  return (
    <div className="Releases">
      <div className="release" onClick={handleNewCollection}>
        <img src={release.thumb} alt="Album cover" />
        <h5>{release.title}</h5>
        <h5>Release year: {release.year}</h5>
        <div className="btns">
          <abbr title="Add to a new Collection">
            <button
              className="bookmarkingBtn"
              type="button"
              onClick={() => {
                setShowNewCollectionName(true);
                setNewCollection({
                  elements: [
                    {
                      elementID: `${release.id}`,
                      elementPic: release.thumb,
                      elementTitle: release.title,
                      isArtist: false,
                    },
                  ],
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
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
                    elementID: `${release.id}`,
                    elementPic: release.thumb,
                    elementTitle: release.title,
                    isArtist: false,
                  },
                ]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 21V5.8L5.3 3h13.4L21 5.8v5.625q-.475-.175-.975-.288T19 11.026q-.825 0-1.587.188T16 11.8V8H8v8l4-2l1.45.725q-.2.525-.325 1.088T13 16.975q0 1.125.4 2.163T14.55 21zm15 0v-3h-3v-2h3v-3h2v3h3v2h-3v3zM5.4 6h13.2l-.85-1H6.25z"
                ></path>
              </svg>
            </button>
          </abbr>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Releases;
