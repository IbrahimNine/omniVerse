import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Album from "../components/Artist/Album";
import Releases from "../components/Artist/Releases";
import FullSizePhoto from "../components/Artist/FullSizePhoto";
import { useArtistContext } from "../contexts/ArtistContext";
import { useReleaseContext } from "../contexts/ReleaseContext";

function Artist() {
  const artistId = useParams().id;
  const { showDetails } = useReleaseContext();
  const {
    fetchMoreReleases,
    isPagedReleases,
    setId,
    artistData,
    artistReleases,
    showFullSize,
    setShowFullSize,
  } = useArtistContext();

  useEffect(() => {
    setId(artistId);
  }, [setId, artistId]);

  const handleScroll =() => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.querySelector(".ArtistReleases");
    const hasScrolledToBottom = scrollTop + clientHeight === scrollHeight;
    if (hasScrolledToBottom && isPagedReleases) {
      fetchMoreReleases();
    }
  }

  return (
    <div className="Artist">
      <aside className="ArtistData">
        {artistData.images && (
          <img
            src={artistData.images[0].uri}
            alt="Artist"
            onClick={() => setShowFullSize(!showFullSize)}
          />
        )}
        <h3>{artistData.name}</h3>
        <p>
          {artistData.profile &&
            (artistData.profile.length > 100
              ? artistData.profile.slice(0, 100) + "..."
              : artistData.profile)}
        </p>
      </aside>
      <section className="ArtistReleases" onScroll={handleScroll}>
        {artistReleases?.map((release, index) => (
          <Releases key={index} release={release} />
        ))}
      </section>
      {showDetails && <Album />}
      {showFullSize && <FullSizePhoto />}
    </div>
  );
}

export default Artist;
