import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Releases from "../components/Artist/Releases";
import FullSizePhoto from "../components/Artist/FullSizePhoto";
import { useArtistContext } from "../contexts/ArtistContext";

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

  useEffect(() => {
    setId(artistId);
  }, [setId, artistId]);

  useEffect(() => {
    const originalTitle = document.title;
    if (artistData.name !== undefined) {
      document.title = `${artistData.name} | ${document.title}`;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [artistData]);

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
        {artistData.images ? (
          <img
            src={artistData.images[0].uri}
            alt="Artist"
            onClick={() => setShowFullSize(!showFullSize)}
          />
        ) : (
          <img src="/default2.png" alt="Artist" style={{ cursor: "unset" }} />
        )}
        <h3>{artistData.name}</h3>
        <p>
          {artistData.profile &&
            (artistData.profile.length > 100
              ? artistData.profile.slice(0, 100) + "..."
              : artistData.profile)}
        </p>
        {artistData.aliases && <h4 style={{ margin: "7% 0 0 0" }}>See also:</h4>}
        <div className="RelatedArtists"
          style={{
         
          }}
        >
          {artistData.aliases &&
            artistData.aliases.map((item, index) => (
              <Link key={index} to={`/artist/${item.id}`}>
                {item.name}
              </Link>
            ))}
        </div>
      </aside>
      <div className="ArtistReleasesWrapper">
        <section className="ArtistReleases" onScroll={handleScroll}>
          {artistReleases?.map((release, index) => (
            <Releases key={index} release={release} index={index} />
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
      {showFullSize && <FullSizePhoto />}
    </div>
  );
}

export default Artist;
