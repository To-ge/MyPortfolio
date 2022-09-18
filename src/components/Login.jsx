import React from "react";
import { accessUrl } from "../Spotify";
import "./login.scss";
import ReturnTop from "./ReturnTop";

const Login = () => {
  return (
    <div className="login">
      <ReturnTop />
      <div className="login-title">
        <span>Music Bank</span>
      </div>
      <div className="login-desc">
        SpotifyAPIを使用しています。
        下のログインボタンをクリックして遷移先のページで
        <span>同意する</span>をクリックして下さい。
      </div>
      <div className="login-button">
        <a href={accessUrl}>ログイン</a>
      </div>
    </div>
  );
};

export default Login;
