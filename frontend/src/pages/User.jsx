import React, { useEffect } from "react";
import { usePlayedTracksContext } from "../contexts/PlayedTracksContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useReleaseContext } from "../contexts/ReleaseContext";
import DataBar from "../components/User/DataBar";

function User() {
  const { getUserPlayedTracks, mostPlayedData } = usePlayedTracksContext();
  const { showTracks } = useReleaseContext();
  const { user } = useAuthContext();
  useEffect(() => {
    getUserPlayedTracks();
  }, [getUserPlayedTracks]);

  return (
    <div className="UserWrapper">
      <div className="User">
        <div className="UserDetailedDash">
          <img src={user.userPic} alt="" />
          {mostPlayedData && <DataBar mostPlayedData={mostPlayedData} />}
          <p>
            Total Played Tracks&nbsp;
            {mostPlayedData ? mostPlayedData.total : 0}
          </p>
        </div>
        <div className="mostPlayedWrapper">
          {mostPlayedData && (
            <>
              <div className="mostPlayedCardWrapper">
                <p>Top track of the week</p>
                <div className="mostPlayed">
                  <img src={mostPlayedData?.weekly.trackAlbumPic} alt="" />
                  <div className="periodIcon">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.88 120.76"
                    >
                      <defs>
                        <style>{`.cls-1{fill:#ef4136;}.cls-2{fill:#1a1a1a;}`}</style>
                      </defs>
                      <title>Most played of the week</title>
                      <path
                        className="cls-1"
                        d="M42.13,84.19h6.39l-3,19.12h-8l-1.41-7h-.36l-1.38,7h-8l-3-19.12H29.8l1.44,10.68h.18l2.21-10.68h4.68l2.17,10.68h.18l1.47-10.68Zm20.39,11.9H56.4v2.33h7.5v4.89H50.28V84.19H63.75L63,89.09H56.4v2.57h6.12v4.43Zm16.45,0H72.85v2.33h7.49v4.89H66.73V84.19H80.19l-.77,4.9H72.85v2.57H79v4.43ZM89.29,95v8.32H83.17V84.19h6.12V92h.12a4.49,4.49,0,0,1,.31-1.47l3-6.33h6.61l-4.59,9.39,4.74,9.73H92.87l-3.15-6.85A4.49,4.49,0,0,1,89.41,95Z"
                      />
                      <path
                        className="cls-2"
                        d="M82.69,4.21C82.69,1.87,85,0,87.84,0S93,1.91,93,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.15-1.9-5.15-4.21V4.21ZM73.93,71.34h-24V62.65h7.55V44.82l-8.61.65V36.78L60.32,34H68.9v28.7h5v8.69ZM29.67,4.21C29.67,1.87,32,0,34.83,0S40,1.91,40,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.16-1.9-5.16-4.21V4.21ZM6.76,111.3a2.66,2.66,0,0,0,.76,1.87,2.56,2.56,0,0,0,1.87.75h104a2.65,2.65,0,0,0,1.86-.75,2.56,2.56,0,0,0,.75-1.87v-91a2.56,2.56,0,0,0-2.57-2.58h-8.33c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86h9.41a8.4,8.4,0,0,1,8.34,8.34v93.2a8.38,8.38,0,0,1-8.34,8.34H8.34a8.28,8.28,0,0,1-5.88-2.45A8.37,8.37,0,0,1,0,112.42V19.22a8.29,8.29,0,0,1,2.46-5.88,8.35,8.35,0,0,1,5.88-2.46H18.43a2.85,2.85,0,0,1,2.86,2.86c0,1.59-1.27,3.94-2.86,3.94h-9a2.69,2.69,0,0,0-1.87.75A2.59,2.59,0,0,0,6.8,20.3c0,28.81,0,62.06,0,91ZM51.55,17.64c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86H70.77a2.84,2.84,0,0,1,2.85,2.86c0,1.59-1.26,3.94-2.85,3.94Z"
                      />
                    </svg>
                  </div>
                  <div className="mostPlayedDetails">
                    <h4>{mostPlayedData?.weekly.trackTitle}</h4>
                    <h5
                      onClick={() =>
                        showTracks({ id: mostPlayedData?.weekly.trackAlbumID })
                      }
                    >
                      {mostPlayedData?.weekly.trackAlbum}
                    </h5>
                    <Link
                      to={`/artist/${mostPlayedData?.weekly.trackArtistID}`}
                    >
                      <h5>{mostPlayedData?.weekly.trackArtist}</h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mostPlayedCardWrapper">
                <p>Top track of the month</p>
                <div className="mostPlayed">
                  <img src={mostPlayedData?.monthly.trackAlbumPic} alt="" />
                  <div className="periodIcon">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 122.88 120.76"
                    >
                      <defs>
                        <style>{`.cls-1{fill:#ef4136;}.cls-2{fill:#1a1a1a;}`}</style>
                      </defs>
                      <title>Most played of the month</title>
                      <path
                        className="cls-1"
                        d="M82.69,4.21C82.69,1.87,85,0,87.84,0S93,1.91,93,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.15-1.9-5.15-4.21V4.21ZM73.93,71.34h-24V62.65h7.55V44.82l-8.61.65V36.78L60.32,34H68.9v28.7h5v8.69ZM29.67,4.21C29.67,1.87,32,0,34.83,0S40,1.91,40,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.16-1.9-5.16-4.21V4.21ZM6.76,111.3a2.66,2.66,0,0,0,.76,1.87,2.56,2.56,0,0,0,1.87.75h104a2.65,2.65,0,0,0,1.86-.75,2.56,2.56,0,0,0,.75-1.87v-91a2.56,2.56,0,0,0-2.57-2.58h-8.33c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86h9.41a8.4,8.4,0,0,1,8.34,8.34v93.2a8.38,8.38,0,0,1-8.34,8.34H8.34a8.28,8.28,0,0,1-5.88-2.45A8.37,8.37,0,0,1,0,112.42V19.22a8.29,8.29,0,0,1,2.46-5.88,8.35,8.35,0,0,1,5.88-2.46H18.43a2.85,2.85,0,0,1,2.86,2.86c0,1.59-1.27,3.94-2.86,3.94h-9a2.69,2.69,0,0,0-1.87.75A2.59,2.59,0,0,0,6.8,20.3c0,28.81,0,62.06,0,91ZM51.55,17.64c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86H70.77a2.84,2.84,0,0,1,2.85,2.86c0,1.59-1.26,3.94-2.85,3.94Z"
                      />
                      <path
                        className="cls-2"
                        d="M20.18,103.31h-6.4l1.16-19.12h8l2.38,9.73h.22l2.39-9.73h8l1.16,19.12H30.67L30.3,94h-.21l-2.33,9.27H23.08L20.72,94h-.18l-.36,9.27ZM38,93.77c0-3.49.65-6,2-7.64s3.66-2.4,7.06-2.4,5.77.8,7.07,2.4,2,4.15,2,7.64a20,20,0,0,1-.41,4.37,8,8,0,0,1-1.42,3.09,5.84,5.84,0,0,1-2.79,1.93,13.59,13.59,0,0,1-4.41.61,13.57,13.57,0,0,1-4.4-.61,5.76,5.76,0,0,1-2.78-1.93,7.86,7.86,0,0,1-1.43-3.09A20,20,0,0,1,38,93.77Zm6.58-3.18v8H47.1a4.15,4.15,0,0,0,1.82-.29c.38-.19.56-.64.56-1.33V89H46.91a4.24,4.24,0,0,0-1.79.28c-.37.2-.56.64-.56,1.34Zm24.38,12.72-4.68-6.79A3.26,3.26,0,0,1,64,95.05h-.12v8.26H57.71V84.19h5.76L68.15,91a3.23,3.23,0,0,1,.3,1.47h.12V84.19h6.12v19.12Zm22-14.22H86.47v14.22H80.35V89.09H75.91v-4.9h15v4.9Zm11.94,14.22V96.55H98.25v6.76H92.13V84.19h6.12V91h4.59V84.19H109v19.12Z"
                      />
                    </svg>
                  </div>
                  <div className="mostPlayedDetails">
                    <h4>{mostPlayedData?.monthly.trackTitle}</h4>
                    <h5
                      onClick={() =>
                        showTracks({ id: mostPlayedData?.monthly.trackAlbumID })
                      }
                    >
                      {mostPlayedData?.monthly.trackAlbum}
                    </h5>
                    <Link
                      to={`/artist/${mostPlayedData?.monthly.trackArtistID}`}
                    >
                      <h5>{mostPlayedData?.monthly.trackArtist}</h5>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
