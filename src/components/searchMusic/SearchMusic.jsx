import React, { useEffect, useMemo, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import "./searchMusic.scss";
import ReturnTop from "../ReturnTop";

const SearchMusic = ({ token }) => {
  const [albumId, setAlbumId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [tracksData, setTracksData] = useState([]);
  const [changingInput, setChangingInput] = useState("");
  const [show, setShow] = useState(false);
  const [showTrack, setShowTrack] = useState(false);

  const recommendedArtist = useMemo(
    () => ["TWICE", "IZ*ONE", "New Jeans", "aespa", "Kep1er", "BTS", "IVE"],
    []
  );

  const musicStyle = useMemo(
    () => [
      ["start", "center", "end"],
      [
        "lightseagreen",
        "lightblue",
        "lightcoral",
        "rgb(26, 196, 26)",
        "lightgrey",
        "lightsalmon",
      ],
    ],
    []
  );

  useEffect(() => {
    const getSearch = async () => {
      try {
        const res = await axios.get(
          "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const artistId = res.data.artists.items[0].id;
        console.log(artistId);

        const albums = await axios.get(
          "https://api.spotify.com/v1/artists/" + artistId + "/albums",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(albums.data.items);
        setSearchData(albums.data.items);
      } catch {}
    };

    getSearch();
  }, [searchInput]);

  useEffect(() => {
    if (albumId) {
      const searchTracks = async () => {
        try {
          const tracksRes = await axios.get(
            "https://api.spotify.com/v1/albums/" + albumId + "/tracks",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const tracks = tracksRes.data.items;
          console.log(tracks);

          setTracksData(tracks);
        } catch {}
      };
      searchTracks();
    }
  }, [albumId]);
  console.log(tracksData);

  const handleShowTracks = (id) => {
    setShowTrack(!showTrack);
    setAlbumId(id);
  };

  const handleClick = () => {
    setSearchInput(changingInput);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="search-music">
      <ReturnTop />
      <div className="top">
        <div className="searchbox">
          <input
            placeholder="artist's name"
            onChange={(e) => {
              setChangingInput(e.target.value);
            }}
          />
          <div className="button" onClick={handleClick}>
            検索
          </div>
        </div>
        <div className="recommendation">
          <div className="select-box">
            <div className="recom-text">おすすめアーティスト</div>
            <KeyboardArrowDownIcon
              style={{
                backgroundColor: "lightgray",
                padding: "5px 8px",
                marginLeft: "5px",
                borderRadius: "5px",
                transform: show && "rotateZ(180deg)",
                boxShadow: show
                  ? "inset 3px 3px 10px gray"
                  : " 3px 3px 10px gray",
                cursor: "pointer",
              }}
              onClick={handleShow}
            />
            {show && (
              <ul>
                {recommendedArtist.map((artist, index) => (
                  <li
                    key={index}
                    name={artist}
                    onClick={(e) => {
                      setSearchInput(e.target.outerText);
                    }}
                  >
                    {artist}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="data-row">
        {searchData &&
          searchData.map((item) => (
            <div
              key={item.id}
              className="search-data"
              onClick={() => handleShowTracks(item.id)}
            >
              {(albumId === item.id) & showTrack ? (
                <div className="panel">
                  <h3>Tracks</h3>
                  <div className="track-data">
                    {tracksData?.map((track) => (
                      <div
                        className="music-item"
                        style={{
                          fontSize: Math.floor(
                            230 /
                              (tracksData.length + track.name.split("").length)
                          ),
                          justifyContent:
                            musicStyle[0][
                              track.name.split("").length % musicStyle[0].length
                            ],
                          color:
                            musicStyle[1][
                              track.name.split("").length % musicStyle[1].length
                            ],
                        }}
                      >
                        <span>{track.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p>{item.name}</p>
                  <div className="data-img">
                    <img src={item.images[1].url} name={item.id} />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchMusic;
