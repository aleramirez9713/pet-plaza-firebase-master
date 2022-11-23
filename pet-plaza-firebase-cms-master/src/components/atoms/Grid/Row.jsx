import React from "react";
import { Row } from "antd";

const Rows = ({ children, ...rest }) => {
  return <Row {...rest}>{children}</Row>;
};

export default Rows;