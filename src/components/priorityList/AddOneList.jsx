import React, { useEffect, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./addOneList.scss";
import StarRateIcon from "@mui/icons-material/StarRate";
import { todoRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";

const AddOneList = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [todoList, setTodoList] = useState(null);
  const [meritList, setMeritList] = useState([]);
  const [inputMerit, setInputMerit] = useState("");
  const [warnInput, setWarnInput] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const [data, setData] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    // データベースに項目を登録
    const addNewTodo = async () => {
      try {
        const res = await todoRequest.post("/add", todoList);
        setData(res);
      } catch {}
    };
    addNewTodo();
  }, [todoList]);

  useEffect(() => {
    // 前のページに遷移
    data && navigation("/priority");
  }, [data]);

  // メリット文を追加
  const addOneMerit = () => {
    setWarnInput(false);
    if (inputMerit === "") {
      setWarnInput(true);
    } else {
      setMeritList((prev) => [...prev, inputMerit]);
      setInputMerit("");
    }
  };

  // 項目の決定、不備があれば警告する
  const registerList = () => {
    if (inputTitle === "") {
      setAlertText("項目名を記入してください");
    } else if (!meritList.length) {
      setAlertText("メリットを1つ以上追加してください");
    } else {
      setTodoList({ title: inputTitle, merit: meritList });
    }
  };

  return (
    <div className="add-one-list">
      <div className="new-list">
        <div className="list-name">
          <span>項目名: </span>
          <input
            placeholder="やるべきことを記入"
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <div className="add-area">
          {/* メリット文の追加 */}
          <div className="add-merit">
            <ArrowCircleRightIcon
              style={{ display: "inline-block", color: "gray" }}
            />
            <input
              placeholder={
                warnInput ? "メリットが記入されていません" : "メリットを記入"
              }
              onChange={(e) => setInputMerit(e.target.value)}
              value={inputMerit}
            />
          </div>
          <div className="add-button" onClick={addOneMerit}>
            追加
          </div>
        </div>
        <div className="merit-row">
          <div className="merit-title">
            <span>メリット一覧</span>
          </div>
          <ul>
            {meritList.map((merit, index) => (
              <li key={index}>
                <StarRateIcon
                  style={{
                    color: "yellow",
                    filter: "drop-shadow(3px 3px lightcoral)",
                  }}
                />
                {merit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <div className="register-button" onClick={registerList}>
          決定
        </div>
        <div
          style={{
            color: "red",
            textShadow: "0 0 3px white",
          }}
        >
          {alertText}
        </div>
      </div>
    </div>
  );
};

export default AddOneList;
