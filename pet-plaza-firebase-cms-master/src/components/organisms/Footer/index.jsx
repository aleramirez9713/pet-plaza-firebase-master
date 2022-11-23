import React from "react";
import { Footer } from "../../atoms";
import "./style.css";

const Footers = (props) => {
  return <Footer className="footer-style">{props.text}</Footer>;
};
export default Footers;
