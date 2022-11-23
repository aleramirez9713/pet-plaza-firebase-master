import React from "react";
import { Button } from "antd";

const Buttons = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};
export default Buttons;
