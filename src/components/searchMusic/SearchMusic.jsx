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

  // 楽曲情報のスタイル
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
    // 検索されたアーティストのアルバム情報を取得
    const getSearch = async () => {
      try {
        // 1. アーティスト情報の取得
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

        // 2. アーティストIDを元にアルバムを取得
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
      // アルバムの収録楽曲（トラック）を取得
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

          setTracksData(tracks);
        } catch {}
      };
      searchTracks();
    }
  }, [albumId]);

  // 選択されたアルバムIDをもとにトラックを表示
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

      {/* 検索結果一覧 */}
      <div className="data-row">
        {searchData &&
          searchData.map((item) => (
            <div
              key={item.id}
              className="search-data"
              onClick={() => handleShowTracks(item.id)}
            >
              {/* トラック情報 */}
              {(albumId === item.id) & showTrack ? (
                <div className="panel">
                  <h3>Tracks</h3>
                  <div className="track-data">
                    {tracksData?.map((track) => (
                      <div
                        className="music-item"
                        style={{
                          // 曲名が長いほどフォントサイズは小さくなる
                          fontSize: Math.floor(
                            230 /
                              (tracksData.length + track.name.split("").length)
                          ),
                          // 曲名の文字数を3で割った余りでテキストの位置（左、真ん中、右）を分散させる
                          justifyContent:
                            musicStyle[0][
                              track.name.split("").length % musicStyle[0].length
                            ],
                          // 曲名の文字数を6で割った余りでカラーを決める
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
                  {/* アルバム情報 */}
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
