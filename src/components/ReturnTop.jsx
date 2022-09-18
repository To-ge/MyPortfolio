import React from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ReturnButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: center;
  padding: 10px 15px;
  background-color: lightgray;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: inset 0 0 15px 3px darkblue, 0 0 10px 3px black;

  &:active {
    background-color: lightblue;
  }
`;

const ReturnTop = () => {
  const navigation = useNavigate();
  const moveTop = () => {
    navigation("/");
  };

  return (
    <ReturnButton onClick={moveTop}>
      <ReplyAllIcon style={{ color: "lightcoral" }} />
      <span
        style={{ display: "inline-block", color: "gray", fontWeight: "bold" }}
      >
        TOPへ戻る
      </span>
    </ReturnButton>
  );
};

export default ReturnTop;
