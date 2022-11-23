import React from "react";
import { Drawer } from "antd";

const Drawers = ({ children, ...rest }) => {
  return <Drawer {...rest}>{children}</Drawer>;
};
export default Drawers;
