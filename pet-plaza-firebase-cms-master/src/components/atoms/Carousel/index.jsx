import React from "react";
import { Carousel } from "antd";

const Carousels = ({ children, ...rest }) => {
  return <Carousel {...rest}>{children}</Carousel>;
};

export default Carousels;
