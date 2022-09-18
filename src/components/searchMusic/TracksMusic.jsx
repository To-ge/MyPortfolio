import React, { useEffect, useState } from "react";
import axios from "axios";

const TracksMusic = ({ token, album }) => {
  const [tracksData, setTracksData] = useState([]);
  const [albumId, setAlbumId] = useState(null);

  const albumsId = album.map((item) => {
    return { id: item.id };
  });

  setAlbumId(albumsId);
  console.log(albumId);

  useEffect(() => {
    const create = () => {
      albumsId.map(async (album) => {
        try {
          const tracksRes = await axios.get(
            "https://api.spotify.com/v1/albums/" + album.id + "/tracks",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const tracks = tracksRes.data.items;
          console.log(tracks);
          setTracksData([...tracksData, { tracks }]);
        } catch {}
      });
    };
    create();
  }, [albumId]);

  return (
    <div>
      {tracksData.map(
        (track, index) =>
          track.tracks && (
            <div className="panel" key={index}>
              <h3>Tracks</h3>
              <div className="track-data">
                {track.tracks.map((item) => {
                  <p key={item.id}>{item.name}</p>;
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default TracksMusic;
