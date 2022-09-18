import React from "react";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="title">My Portfolio</div>
      <div className="main">
        <div className="text">
          自分がハマっている野球や音楽のページと思いつきで作成した課題管理ツールです。
        </div>
        <div className="contents">
          <div className="categories">
            <Link
              to="/music"
              style={{
                textDecoration: "none",
                margin: " 30px 20px",
              }}
            >
              <div className="category">
                <div className="slide-start audio">Music</div>
                <div className="slide-finish">OPEN</div>
              </div>
            </Link>
            <Link
              to="/mlb"
              style={{ textDecoration: "none", margin: " 30px 20px" }}
            >
              <div className="category">
                <div className="slide-start major">MLB</div>
                <div className="slide-finish">OPEN</div>
              </div>
            </Link>
            <Link
              to="/priority"
              style={{ textDecoration: "none", margin: " 30px 20px" }}
            >
              <div className="category">
                <div className="slide-start task">PriorityList</div>
                <div className="slide-finish">OPEN</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
