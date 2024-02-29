import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Releases from "../components/Releases";

function Artist() {
  const artistId = useParams().id;
  const [artistData, setArtistData] = useState({});
  const [artistReleases, setArtistReleases] = useState([]);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  useEffect(() => {
    axios
      .get(`https://api.discogs.com/artists/${artistId}`, {
        headers: {
          Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
        },
      })
      .then((res) => setArtistData(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`https://api.discogs.com/artists/${artistId}/releases?sort=year`)
      .then((res) => setArtistReleases(res.data.releases.filter((item)=>item.role==="Main")))
      .catch((err) => console.log(err));
  }, [
    artistId,
    setArtistData,
    setArtistReleases,
    discogsKey,
    discogsSecretKey,
  ]);
  console.log(artistReleases);

  return (
    <div className="Artist">
      <aside className="ArtistData">
        {artistData.images && <img src={artistData.images[0].uri} alt="" />}
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
    </div>
  );
}

export default Artist;
