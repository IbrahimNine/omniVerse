import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const ReleaseContext = createContext();
export const useReleaseContext = () => useContext(ReleaseContext);
export function ReleaseProvider({ children }) {
  const [releaseData, setReleaseData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [releaseCord, setReleaseCord] = useState();
  const [trackData, setTrackData] = useState({
    id: "LS31VZCeD7c",
    title:
      "Cézame Trailers - Omniverse [Epic Music - Powerful Orchestral Hybrid]",
  });
  const [play, setPlay] = useState(false);
  const discogsKey = process.env.REACT_APP_DISCOGS_KEY;
  const discogsSecretKey = process.env.REACT_APP_DISCOGS_SECRET_KEY;

  const showTracks = (release) => {
    if (!showDetails) {
      axios
        .get(
          `https://api.discogs.com/releases/${
            release.main_release ? release.main_release : release.id
          }`,
          {
            headers: {
              Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
            },
          }
        )
        .then((res) => {
          setReleaseData(res.data);
          setReleaseCord(release);
        })
        .catch((err) => console.log(err));
    } else {
      setReleaseData();
      setReleaseCord();
    }
    setShowDetails(!showDetails);
  };

  const showTracksAlone = (release) => {
    if (release) {
      let releaseId = "";
      axios
        .get(`https://api.discogs.com/masters/${release.id}`, {
          headers: {
            Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
          },
        })
        .then((res) => {
          releaseId = res.data.main_release;

          axios
            .get(`https://api.discogs.com/releases/${releaseId}`, {
              headers: {
                Authorization: `Discogs key=${discogsKey}, secret=${discogsSecretKey}`,
              },
            })
            .then((res) => {
              setReleaseData(res.data);
              setReleaseCord(release);
              setShowDetails(!showDetails);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePlaying = () => {
    setPlay(!play);
  };

  return (
    <ReleaseContext.Provider
      value={{
        showDetails,
        setShowDetails,
        releaseData,
        setReleaseData,
        showTracks,
        releaseCord,
        setReleaseCord,
        showTracksAlone,
        handlePlaying,
        play,
        setPlay,
        trackData,
        setTrackData,
      }}
    >
      {children}
    </ReleaseContext.Provider>
  );
}
