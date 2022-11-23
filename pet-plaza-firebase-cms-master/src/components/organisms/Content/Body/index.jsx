import React from "react";
import { Content } from "../../../atoms";
import "./style.css";

const Contents = ({ component }) => {
  return <Content className="body-content-page">{component}</Content>;
};
export default Contents;
