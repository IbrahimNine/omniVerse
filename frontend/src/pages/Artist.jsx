import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Releases from "../components/Releases";
import { useArtistContext } from "../contexts/ArtistContext";
import FullSizePhoto from "../components/FullSizePhoto";
import { useReleaseContext } from "../contexts/ReleaseContext";
import Album from "../components/Album";

function Artist() {
  const artistId = useParams().id;
  const { setId, artistData, artistReleases, showFullSize, setShowFullSize } =
    useArtistContext();
  useEffect(() => {
    setId(artistId);
  }, [setId, artistId]);
  const { showDetails } = useReleaseContext();


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
      <section className="ArtistReleases">
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
