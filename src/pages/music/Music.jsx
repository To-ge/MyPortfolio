import React, { useEffect, useState } from "react";
import Login from "../../components/Login";
import SearchMusic from "../../components/searchMusic/SearchMusic";
import { getTokenFromUrl } from "../../Spotify";

const Music = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const accessToken = hash.access_token;

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);
  console.log(token);

  return <div>{token ? <SearchMusic token={token} /> : <Login />}</div>;
};

export default Music;
