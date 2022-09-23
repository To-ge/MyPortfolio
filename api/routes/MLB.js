const router = require("express").Router();
const axios = require("axios");

const playerProfile =
  "https://api.sportsdata.io/v3/mlb/scores/json/Players/LAA";
const seasonStats =
  "https://api.sportsdata.io/v3/mlb/stats/json/PlayerSeasonStats";

// 各チームの選手情報
const getPlayerPlofile = () => {
  return axios
    .get(playerProfile, {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.MLB_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

// 指定したシーズンの成績
const getSeasonStats = (season) => {
  return axios
    .get(`${seasonStats}/${season}`, {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.MLB_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

router.get("/teamdata", async (req, res) => {
  const pp = await getPlayerPlofile();
  res.status(200).json(pp);
});
router.get("/stats", async (req, res) => {
  const season = 2021;
  const ss = await getSeasonStats(season);
  res.status(200).json(ss);
});

module.exports = router;
