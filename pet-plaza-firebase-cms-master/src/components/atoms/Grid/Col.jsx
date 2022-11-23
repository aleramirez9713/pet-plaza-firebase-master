import React from "react";
import { Col } from "antd";

const Cols = ({ children, ...rest }) => {
  return <Col {...rest}>{children}</Col>;
};

export default Cols;
