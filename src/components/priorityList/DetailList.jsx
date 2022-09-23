import React, { useEffect, useState } from "react";
import "./detailList.scss";
import StarsIcon from "@mui/icons-material/Stars";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../redux/todoRedux";
import { todoRequest } from "../../requestMethods";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DetailList = () => {
  const [meritInput, setMeritInput] = useState("");
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [warnText, setWarnText] = useState(false);
  const [id, setId] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    // 選択された項目の情報をセットする
    setTodoList(location.state.todo);
  }, []);

  // 前のページに戻る
  const returnPage = () => {
    navigation("/priority");
  };

  // メリット文のインデックスをセットする
  const clickDelete = (index) => {
    setId(index);
  };

  // メリット文を追加する
  const addMerit = (e) => {
    e.preventDefault();
    setTodoList({ ...todoList, merit: [...todoList.merit, meritInput] });
    setMeritInput("");
  };

  // メリット文を削除する
  const deleteMerit = (index) => {
    todoList.merit.splice(index, 1);
    setTodoList({ ...todoList, merit: todoList.merit });
    setDeleteInfo(null);
    setId(null);
  };

  // 項目自体を削除し前のページに戻る
  const deleteList = async () => {
    try {
      todoRequest.delete(`/${todoList._id}`);
      returnPage();
    } catch {}
  };

  useEffect(() => {
    // メリット一覧が変更された時にデータベースの更新を行う
    const meritUpdate = async () => {
      try {
        const res = await todoRequest.put(`/${todoList._id}`, {
          title: todoList.title,
          merit: todoList.merit,
        });
        dispatch(updateTodo({ id: todoList._id, todo: res.data }));
      } catch {}
    };
    meritUpdate();
  }, [todoList]);

  // メリット文を削除するか問う
  useEffect(() => {
    setDeleteInfo(true);
  }, [id]);

  return (
    <div className="detail">
      <div className="detail-top">
        {/* 前のページに戻るボタン */}
        <div className="return-button" onClick={returnPage}>
          <KeyboardDoubleArrowLeftIcon style={{ color: "gray" }} />
          <div>戻る</div>
        </div>
        {warnText ? (
          <div className="warning">
            <div className="warntext">
              このリストを削除します。よろしいですか?
            </div>
            <div className="warnbottun">
              <div
                onClick={() => {
                  setWarnText(false);
                }}
              >
                キャンセル
              </div>
              <div onClick={deleteList}>はい</div>
            </div>
          </div>
        ) : (
          // 項目の削除ボタン
          <div className="delete-list" onClick={() => setWarnText(true)}>
            <DeleteForeverIcon style={{ color: "red" }} />
            <div>削除</div>
          </div>
        )}
      </div>
      <div className="detail-list">
        <div className="top">
          <div className="title">
            項目名: <span>{todoList?.title}</span>
          </div>
          <div className="add-list">
            {/* メリット文の追加 */}
            <input
              type="text"
              placeholder="メリットに追加する文章を記入"
              onChange={(e) => setMeritInput(e.target.value)}
              value={meritInput}
            />
            <button onClick={addMerit}>追加</button>
          </div>
        </div>
        {/* メリット一覧 */}
        <div className="merit-list">
          <div className="text">
            <h3>メリット</h3>
          </div>
          <ul>
            {todoList?.merit.map((item, index) => (
              <li key={index}>
                <StarsIcon style={{ color: "blue" }} />
                {item}
                <BackspaceOutlinedIcon
                  // メリット文削除ボタン
                  style={{ color: "gray", fontSize: 15, cursor: "pointer" }}
                  onClick={() => clickDelete(index)}
                />
                {Boolean(deleteInfo & (id === index)) && (
                  // 削除ボタンを押された文と同じ列に確認文を出す
                  <div className="warning">
                    <PlayArrowIcon
                      style={{
                        position: "absolute",
                        top: "33%",
                        left: "-20px",
                        transform: "rotate(180deg)",
                        color: "lightgray",
                      }}
                    />
                    <div className="warntext">
                      この一文を削除します。よろしいですか?
                    </div>
                    <div className="warnbottun">
                      <div
                        onClick={() => {
                          // 確認文の非表示、インデックスのリセット
                          setDeleteInfo(false);
                          setId(null);
                        }}
                      >
                        キャンセル
                      </div>
                      <div onClick={() => deleteMerit(index)}>はい</div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailList;
