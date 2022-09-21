import React, { useEffect, useState } from "react";
import { mlbRequest } from "../../requestMethods";
import "./mlb.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import {
  angelsMembers,
  homerunRanking,
  StrikeOutRanking,
  MVPConflict,
} from "./MLBgrades";
import ReturnTop from "../../components/ReturnTop";

const Anime = () => {
  const [players, setPlayers] = useState(null);
  const [show, setShow] = useState(false);
  const [seasonStats, setSeasonStats] = useState(null);
  const [fieldPlayer, setFieldPlayer] = useState(null);
  const [positionPlayer, setPositionPlayer] = useState(null);
  const [homerun, setHomerun] = useState(false);
  const [mvpPanel, setMvpPanel] = useState(false);
  const [strikeOut, setStrikeOut] = useState(false);

  useEffect(() => {
    const getTeamData = () => {
      mlbRequest
        .get("/teamdata")
        .then((res) => setPlayers(res.data))
        .catch((err) => console.log(err));
    };
    getTeamData();

    const getSeasonStats = () => {
      mlbRequest
        .get("/stats")
        .then((res) => setSeasonStats(res.data))
        .catch((err) => console.log(err));
    };
    getSeasonStats();
  }, []);

  useEffect(() => {
    const selectedPlayer = players?.find(
      (item) => item.YahooName === angelsMembers[fieldPlayer].name
    );
    const birthDate = selectedPlayer?.BirthDate.split("T");
    selectedPlayer &&
      setPositionPlayer({ ...selectedPlayer, BirthDate: birthDate[0] });
  }, [fieldPlayer]);

  return (
    <div className="mlb">
      <ReturnTop />
      <div className="mlb-top">
        <div className="mlb-title">Major League Baseball</div>
        <div className="mlb-desc">
          <span style={{ color: "blue", fontSize: 22, fontWeight: "bold" }}>
            sports
          </span>
          data
          <span
            style={{
              backgroundColor: "blue",
              padding: "2px",
              borderRadius: "50%",
              boxShadow: "0 0 3px white",
            }}
          >
            io
          </span>
          のAPIを使用しています。成績は
          <span style={{ color: "black", textShadow: "2px 2px 2px white" }}>
            2021
          </span>
          年のシーズンを元にしています。
        </div>
      </div>
      <div className="select-area">
        <div className="mvp-conflict" onClick={() => setMvpPanel(!mvpPanel)}>
          {!mvpPanel ? (
            "MVP争い"
          ) : (
            <div className="select-panel">
              <div className="league-name">…アメリカンリーグ…</div>
              {MVPConflict.map((item, index) => {
                if (item.league === "american") {
                  return (
                    <div key={index}>
                      <span className={item.mvp ? "list mvp" : "list"}>
                        {item.name} ({item.team})
                      </span>
                      <br />
                    </div>
                  );
                }
              })}
              <div className="league-name">…ナショナルリーグ…</div>
              {MVPConflict.map((item, index) => {
                if (item.league === "national") {
                  return (
                    <div key={index}>
                      <span className={item.mvp ? "list mvp" : "list"}>
                        {item.name} ({item.team})
                      </span>
                      <br />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="homerun" onClick={() => setHomerun(!homerun)}>
          {!homerun ? (
            "ホームラン"
          ) : (
            <div className="select-panel">
              {homerunRanking.map((item, index) => {
                return (
                  <div key={index}>
                    <span className="list">
                      <span style={{ color: item.color }}>
                        {item.number}位:
                      </span>
                      {item.name} ({item.record})
                    </span>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="strike-out" onClick={() => setStrikeOut(!strikeOut)}>
          {!strikeOut ? (
            "奪三振"
          ) : (
            <div className="select-panel">
              {StrikeOutRanking.map((item, index) => {
                return (
                  <div key={index}>
                    <span className="list">
                      <span style={{ color: item.color }}>
                        {item.number}位:
                      </span>
                      {item.name} ({item.record}個)
                    </span>
                    <br />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="angels">
        <div className="select-box">
          <div>Angels Member</div>
          <KeyboardArrowDownIcon
            style={{
              backgroundColor: "lightgray",
              padding: "5px 8px",
              marginLeft: "5px",
              borderRadius: "50%",
              transform: show && "rotateZ(180deg)",
              boxShadow: show
                ? "inset 3px 3px 10px gray"
                : " 3px 3px 10px gray",
              cursor: "pointer",
            }}
            onClick={() => setShow(!show)}
          />
          {show && (
            <ul>
              {angelsMembers.map((player, index) => (
                <li
                  key={index}
                  name={player.name}
                  onClick={() => {
                    setFieldPlayer(index);
                  }}
                >
                  {`${player.number} (${player.position}) ${player.name}`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="stadium">
        <div className="outfield-area">
          {fieldPlayer !== null && (
            <PersonPinCircleIcon
              style={{
                position: "absolute",
                top: angelsMembers[fieldPlayer].style.top,
                right: angelsMembers[fieldPlayer].style.right,
                zIndex: 50,
                fontSize: 45,
                color: "rgb(219, 51, 51)",
                filter: "drop-shadow(0px 17px 4px black)",
                animation: "flowing ease-in-out 1.5s infinite alternate",
              }}
            />
          )}
          {positionPlayer && (
            <div className="player-detail">
              <img src={positionPlayer.PhotoUrl} />
              <ul className="player-data">
                <li>
                  <span>出身国:</span>
                  <br />
                  {positionPlayer.BirthCountry}
                </li>
                <li>
                  <span>出身都市:</span>
                  <br />
                  {positionPlayer.BirthCity}
                </li>
                <li>
                  <span>誕生日:</span>
                  <br />
                  {positionPlayer.BirthDate}
                </li>
              </ul>
            </div>
          )}
          <div className="middlefield-area">
            <div className="firstbase"></div>
            <div className="secondbase"></div>
            <div className="thirdbase"></div>
          </div>
          <div className="infield-area">
            <div className="rhombus">
              <div className="mound">
                <div className="plate"></div>
              </div>
            </div>
            <div className="home-area">
              <div className="homebase">
                <ArrowDropDownIcon
                  style={{
                    color: "white",
                    fontSize: "33px",
                    position: "absolute",
                    top: "-5px",
                    left: "-9px",
                  }}
                />
              </div>
              <div className="left-batterbox"></div>
              <div className="right-batterbox"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
