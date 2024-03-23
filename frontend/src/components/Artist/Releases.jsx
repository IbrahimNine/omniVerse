import "./Releases.css";
import { useReleaseContext } from "../../contexts/ReleaseContext";

function Releases({ index, release }) {
  const { showTracks } = useReleaseContext();

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
    <div
      className="Releases"
      style={{
        backgroundColor: index % 2 !== 0 ? "rgba(233, 241, 255, 0.038)" : "none",
      }}
    >
      <div className="release" onClick={handleNewCollection}>
        <img src={release.thumb} alt="Album cover" />
        <h5 className="albumTitle">{release.title}</h5>
        <h5 className="ReleasedDate">{release.year}</h5>

        <abbr title="Open in detail" className="openDetailed">
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
        </abbr>
      </div>
    </div>
  );
}

export default Releases;
