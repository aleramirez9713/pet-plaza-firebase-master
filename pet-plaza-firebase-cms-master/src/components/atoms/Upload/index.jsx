import React from "react";
import { Upload } from "antd";

const Uploads = ({ children, ...rest }) => {
  return <Upload {...rest}> {children} </Upload>;
};

export default Uploads;
