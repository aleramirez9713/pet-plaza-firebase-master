import React from "react";
import { Tooltip } from "antd";

const Tooltips = ({ children, ...rest }) => {
  return <Tooltip {...rest}>{children}</Tooltip>;
};
export default Tooltips;
