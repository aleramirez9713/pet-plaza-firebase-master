import React from "react";
import { Popover } from "antd";

const Popovers = ({ children, ...rest }) => {
  return <Popover {...rest}>{children}</Popover>;
};

export default Popovers;
