import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./priorityList.scss";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { todoRequest } from "../../requestMethods";
import styled from "styled-components";
import ReturnTop from "../ReturnTop";

const Bargraph = styled.li`
  width: 50px;
  max-height: 100%;
  height: ${(props) =>
    // 棒グラフの長さ
    props.perc}%;
  background-image: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.3) 40%,
    rgba(255, 255, 255, 0.3) 60%,
    transparent 60%
  );
  background-color: rgb(255, 177, 33);
  list-style: none;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;

const Circlegraph = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    ${(props) =>
      // 円グラフの色指定
      `conic-gradient(transparent 0% ${props.total - props.perc}%,${
        props.color[props.index]
      } ${props.total - props.perc}% ${props.total}%, transparent ${
        props.total
      }% 100%);`}
  background-color:transparent;
  border-radius: 50%;
`;

const PriorityList = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [changeGraph, setChangeGraph] = useState(false);
  const [todos, setTodos] = useState([]);
  const [warnText, setWarnText] = useState(false);
  const [totalMerit, setTotalMerit] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // 5つまで作れる項目の円グラフ表示の時の色
  const cGraphColor = useMemo(
    () => ["#d5525f", "#4d55f1", "lightgreen", "yellow", "gray"],
    []
  );

  useEffect(() => {
    // 各項目の情報の取得
    const getTodos = async () => {
      try {
        const res = await todoRequest.get("/");
        // 配列で格納されているメリットの数が大きい順に並べる
        const descArr = res.data.sort(
          (a, b) => b.merit.length - a.merit.length
        );
        setTodos(descArr);
      } catch {}
    };
    getTodos();
  }, []);

  // 各項目の詳細ページに遷移
  const handleMove = (todo) => {
    navigation(`/priority/${todo._id}`, { state: { todo } });
  };

  // 項目の追加
  const addNewTodo = () => {
    if (todos.length === 5) {
      // 項目が5つある場合は警告する
      setWarnText(true);
    } else {
      // 項目追加ページへ遷移
      navigation("/priority/addone");
    }
  };

  useEffect(() => {
    // 全ての項目のメリット数の合計を計算
    let total = 0;
    for (let i = 0; i < todos.length; i++) {
      const meritLength = todos[i].merit.length;
      total = total + meritLength;
    }
    setTotalMerit(total);
  }, [todos]);

  let totalPerc = 0;

  return (
    <div className="wrap">
      <ReturnTop />
      <div className="header">
        <div className="title">
          <h2>優先順位リスト</h2>
          <InfoIcon
            style={{ color: "gray", fontSize: 20, cursor: "pointer" }}
            onClick={() => setShowInfo(true)}
          />
        </div>
        {showInfo && (
          // ページの詳細情報
          <div className="info">
            <CloseIcon
              style={{ color: "white", fontSize: 20, cursor: "pointer" }}
              onClick={() => setShowInfo(false)}
            />
            <div className="info-text">
              グラフを見て自分がやるべきことの優先順位を決めることができます。
              <br />
              棒グラフは色付きグラフ領域、円グラフは項目名を押すと詳細を確認できます。
            </div>
          </div>
        )}
        <div className="button-area">
          {warnText ? (
            // 作成できる項目は5つまでとする
            <div className="warnText">
              課題が溜まっています。終わらせてください。
            </div>
          ) : (
            <>
              <div className="add-button" onClick={addNewTodo}>
                項目追加
              </div>
            </>
          )}
          {/* グラフ変更ボタン */}
          <div
            className="change-graph"
            onClick={() => setChangeGraph(!changeGraph)}
          >
            {changeGraph ? "棒グラフver" : "円グラフver."}
          </div>
        </div>
      </div>
      {!changeGraph && (
        // 棒グラフ
        <div className="bar-graph">
          <ul>
            {todos?.map((todo, index) => {
              // 全メリット数における各項目のメリット数の割合を計算する
              const percent = Math.floor(
                (todo.merit.length * 100) / totalMerit
              );
              return (
                <Bargraph
                  key={index}
                  perc={percent}
                  onClick={() => handleMove(todo)}
                >
                  <div className="percent">{percent}%</div>
                </Bargraph>
              );
            })}
          </ul>
          <div className="bar-name">
            {todos?.map((todo, index) => {
              // 項目名の文字列を1文字ずつ切り取って縦に表示する
              const titleArr = todo.title.split("");
              return (
                <div key={index} className="list-name">
                  {titleArr.map((word, index) => (
                    <>
                      <div key={index}>
                        {word}
                        <br />
                      </div>
                    </>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {changeGraph && (
        // 円グラフ
        <div className="circle-graph">
          <div className="left">
            <div className="pie">
              {todos?.map((todo, index) => {
                // 全メリット数における各項目のメリット数の割合を計算する
                const percent = (todo.merit.length * 100) / totalMerit;
                // マップ関数で繰り返されるたびにパーセントを足していく
                totalPerc = totalPerc + percent;
                return (
                  // 円グラフは各項目の面積部分だけ色を付け、それ以外の部分は透明にし、上に重ねていくようにする
                  <Circlegraph
                    key={index}
                    index={index}
                    color={cGraphColor}
                    total={totalPerc}
                    perc={percent}
                  ></Circlegraph>
                );
              })}
            </div>
          </div>
          <div className="pie-name">
            {/* 各項名と色を表示しクリックでページ遷移する */}
            {todos.map((todo, index) => (
              <div className="list-name" onClick={() => handleMove(todo)}>
                <span style={{ backgroundColor: cGraphColor[index] }}></span>
                {todo.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityList;
