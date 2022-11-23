import React from "react";
import { Typography } from "antd";

export const { Paragraph, Text, Title, Link } = Typography;

const Index = ({ children, ...rest }) => {
  return <Typography {...rest}>{children}</Typography>;
};

export default Index;
