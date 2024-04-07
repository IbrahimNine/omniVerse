import React, { useEffect } from "react";
import { usePlayedTracksContext } from "../contexts/PlayedTracksContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useReleaseContext } from "../contexts/ReleaseContext";
import DataBar from "../components/User/DataBar";

function User() {
  const { getUserPlayedTracks, mostPlayedData } = usePlayedTracksContext();
  const { showTracks } = useReleaseContext();
  const { user } = useAuthContext();
  const { userName } = useParams();
  useEffect(() => {
    getUserPlayedTracks(userName);
  }, [getUserPlayedTracks, userName]);

  return (
    <div className="UserWrapper">
      <div className="User">
        <div className="UserDetailedDash">
          <img src={user.userPic} alt="" />
          {mostPlayedData && <DataBar mostPlayedData={mostPlayedData} />}
          <p>
            Total plays:&nbsp;
            {mostPlayedData ? mostPlayedData.total : 0}
          </p>
        </div>
        <div className="userDetailedData">
          <div className="mostPlayedWrapper">
            {mostPlayedData && (
              <>
                <div className="mostPlayedCardWrapper">
                  <h3>Last 7 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.weekly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                    />

                    <div className="mostPlayedDetails">
                      <h5
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.weekly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.weekly.trackAlbum}
                      </h5>
                      <Link
                        to={`/artist/${mostPlayedData?.weekly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.weekly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.weeklyCount} Plays</h4>
                    </div>
                  </div>
                </div>
                <div
                  className="mostPlayedCardWrapper"
                  style={{
                    backgroundColor: "rgba(233, 241, 255, 0.038)",
                  }}
                >
                  <h3>Last 30 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.monthly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                    />

                    <div className="mostPlayedDetails">
                      <h5
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.monthly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.monthly.trackAlbum}
                      </h5>
                      <Link
                        to={`/artist/${mostPlayedData?.monthly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.monthly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.monthlyCount} Plays</h4>
                    </div>
                  </div>
                </div>
                <div className="mostPlayedCardWrapper">
                  <h3>Last 365 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.yearly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                    />

                    <div className="mostPlayedDetails">
                      <h5
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.yearly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.yearly.trackAlbum}
                      </h5>
                      <Link
                        to={`/artist/${mostPlayedData?.yearly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.yearly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.yearlyCount} Plays</h4>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              width: "95%",
              minHeight: "1px",
              backgroundColor: "rgba(105, 105, 105, 0.527)",
            }}
          />
          {mostPlayedData?.allAlbumsPlayed.length > 0 && (
            <h2 id="listenedArtists">Records you've heard</h2>
          )}
          {mostPlayedData &&
            mostPlayedData.allAlbumsPlayed
              .sort((a, b) => {
                if (a.count === b.count) {
                  if (a.albumArtist < b.albumArtist) {
                    return -1;
                  } else if (a.albumArtist > b.albumArtist) {
                    return 1;
                  } else {
                    return a.album < b.album ? -1 : a.album > b.album ? 1 : 0;
                  }
                } else {
                  return b.count - a.count;
                }
              })
              .map((item, index) => {
                return (
                  <div
                    key={item.index}
                    onClick={() => {
                      showTracks({ id: item.albumID });
                    }}
                    className="PlayedData"
                    style={{
                      backgroundColor:
                        index % 2 !== 0 ? "rgba(233, 241, 255, 0.038)" : "none",
                    }}
                  >
                    <img src={item.albumPic} alt="cover" />

                    <p className="recordDetails">
                      {item.albumArtist} - {item.album}
                    </p>
                    <p>{item.count}</p>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default User;
