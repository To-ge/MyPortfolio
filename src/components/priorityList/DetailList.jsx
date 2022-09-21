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
    setTodoList(location.state.todo);
  }, []);

  const returnPage = () => {
    navigation("/priority");
  };

  const clickDelete = (index) => {
    setId(index);
  };

  const addMerit = (e) => {
    e.preventDefault();
    setTodoList({ ...todoList, merit: [...todoList.merit, meritInput] });
    setMeritInput("");
  };

  const deleteMerit = (index) => {
    todoList.merit.splice(index, 1);
    setTodoList({ ...todoList, merit: todoList.merit });
    setDeleteInfo(null);
    setId(null);
  };

  const deleteList = async () => {
    try {
      todoRequest.delete(`/${todoList._id}`);
      returnPage();
    } catch {}
  };

  useEffect(() => {
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

  useEffect(() => {
    setDeleteInfo(true);
  }, [id]);

  return (
    <div className="detail">
      <div className="detail-top">
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
            <input
              type="text"
              placeholder="メリットに追加する文章を記入"
              onChange={(e) => setMeritInput(e.target.value)}
              value={meritInput}
            />
            <button onClick={addMerit}>追加</button>
          </div>
        </div>
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
                  style={{ color: "gray", fontSize: 15, cursor: "pointer" }}
                  onClick={() => clickDelete(index)}
                />
                {Boolean(deleteInfo & (id === index)) && (
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
