import React, { useEffect, useState } from "react";
import "./User.css";
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
  const [recordsFilter, setRecordsFilter] = useState("");

  useEffect(() => {
    getUserPlayedTracks(userName, "All TIME");
  }, [getUserPlayedTracks, userName]);

  useEffect(() => {
    const originalTitle = document.title;
    if (user.userName !== undefined) {
      document.title = `${user.userName}'s profile | ${document.title}`;
    }
    return () => {
      document.title = originalTitle;
    };
  }, [user]);

  return (
    <div className="UserWrapper">
      <div className="User">
        <div className="UserDetailedDash">
          <img src={user.userPic} alt="" />
          {mostPlayedData && <DataBar mostPlayedData={mostPlayedData} />}
          <p style={{ color: "gray" }}>
            Total listens:&nbsp;
            {mostPlayedData ? mostPlayedData.total : 0}
          </p>
        </div>
        <div className="userDetailedData">
          <div className="mostPlayedWrapper">
            {mostPlayedData && (
              <>
                <div className="mostPlayedCardWrapper">
                  <h3 className="styledTitle">Last 7 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.weekly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.weekly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.weekly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.weekly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.weekly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.weeklyCount} Listens</h4>
                    </div>
                  </div>
                </div>
                <div
                  className="mostPlayedCardWrapper"
                  style={{
                    backgroundColor: "rgba(233, 241, 255, 0.038)",
                  }}
                >
                  <h3 className="styledTitle">Last 30 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.monthly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.monthly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.monthly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.monthly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.monthly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.monthlyCount} Listens</h4>
                    </div>
                  </div>
                </div>
                <div className="mostPlayedCardWrapper">
                  <h3 className="styledTitle">Last 365 days top record</h3>
                  <div className="mostPlayed">
                    <img
                      src={
                        mostPlayedData?.yearly.trackAlbumPic || "/default3.png"
                      }
                      alt=""
                      className="mostPlayedImg"
                    />

                    <div className="mostPlayedDetails">
                      <h3
                        onClick={() =>
                          showTracks({
                            id: mostPlayedData?.yearly.trackAlbumID,
                          })
                        }
                      >
                        {mostPlayedData?.yearly.trackAlbum}
                      </h3>
                      <Link
                        to={`/artist/${mostPlayedData?.yearly.trackArtistID}`}
                      >
                        <h5>{mostPlayedData?.yearly.trackArtist}</h5>
                      </Link>
                      <h4>{mostPlayedData?.yearlyCount} Listens</h4>
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

          <div id="listenedArtists" className="styledTitle">
            <h2>Records you've heard</h2>
            <div className="listenedArtistsTools">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setRecordsFilter(e.target.value);
                }}
              />
              <select
                onChange={(e) => {
                  getUserPlayedTracks(userName, e.target.value);
                }}
              >
                <option value="ALL TIME">All time</option>
                <option value="LAST YEAR">Last 365 days</option>
                <option value="LAST MONTH">Last 30 days</option>
                <option value="LAST WEEK">Last 7 days</option>
              </select>
            </div>
          </div>

          {mostPlayedData &&
            mostPlayedData.allAlbumsPlayed
              .filter((item) => {
                return (
                  item.albumArtist
                    .toLowerCase()
                    .includes(recordsFilter.toLowerCase()) ||
                  item.album.toLowerCase().includes(recordsFilter.toLowerCase())
                );
              })
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
                    key={index}
                    onClick={() => {
                      showTracks({ id: item.albumID });
                    }}
                    className="PlayedData"
                    style={{
                      backgroundImage: ` radial-gradient(circle, transparent 0.5%, black 100%) ,url(${item.albumPic})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* <img src={item.albumPic} alt="cover" /> */}

                    <p className="recordDetails">
                      {item.albumArtist} - <strong>{item.album}</strong>
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
