import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ArtistContext = createContext();
export const useArtistContext = () => useContext(ArtistContext);

export function ArtistContextProvider({ children }) {
  const [id, setId] = useState();
  const [artistData, setArtistData] = useState({});
  const [artistReleases, setArtistReleases] = useState([]);
  const [showFullSize, setShowFullSize] = useState(false);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.discogs.com/artists/${id}`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => setArtistData(res.data))
        .catch((err) => console.log(err));
      axios
        .get(`https://api.discogs.com/artists/${id}/releases?sort=year`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) =>
          setArtistReleases(
            res.data.releases.filter((item) => item.role === "Main")
          )
        )
        .catch((err) => console.log(err));
    }
  }, [id, discogsKey, discogsSecretKey]);

  return (
    <ArtistContext.Provider
      value={{
        artistData,
        artistReleases,
        setId,
        showFullSize,
        setShowFullSize,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
}
