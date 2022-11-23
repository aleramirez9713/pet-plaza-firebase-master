import React from "react";
import { Dropdown } from "antd";

const Dropdowns = ({ children, ...rest }) => {
  return <Dropdown {...rest}>{children}</Dropdown>;
};
export default Dropdowns;
