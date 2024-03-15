import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Releases from "../components/Artist/Releases";
import FullSizePhoto from "../components/Artist/FullSizePhoto";
import { useArtistContext } from "../contexts/ArtistContext";
import NewCollectionName from "../components/Collections/NewCollectionName";
import { useCollectionsContext } from "../contexts/CollectionsContext";
import UserCollectionsList from "../components/Collections/UserCollectionsList";

function Artist() {
  const artistId = useParams().id;
  const {
    fetchMoreReleases,
    isPagedReleases,
    setId,
    artistData,
    artistReleases,
    showFullSize,
    setShowFullSize,
    releasesLoading,
  } = useArtistContext();
  const { showNewCollectionName, showUserCollectionsList } =
    useCollectionsContext();

  useEffect(() => {
    setId(artistId);
  }, [setId, artistId]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.querySelector(".ArtistReleases");
    const offset = 0;
    const hasScrolledToBottom =
      scrollTop + clientHeight + offset >= scrollHeight;
    if (hasScrolledToBottom && isPagedReleases) {
      fetchMoreReleases();
    }
  };

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
      <div className="ArtistReleasesWrapper">
        <section className="ArtistReleases" onScroll={handleScroll}>
          {artistReleases?.map((release, index) => (
            <Releases key={index} release={release} />
          ))}
          {releasesLoading && (
            <img
              src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif"
              alt="loading"
              width={50}
              className="releasesLoading"
            />
          )}
        </section>
      </div>
      {showUserCollectionsList && <UserCollectionsList />}
      {showFullSize && <FullSizePhoto />}
      {showNewCollectionName && <NewCollectionName />}
    </div>
  );
}

export default Artist;
