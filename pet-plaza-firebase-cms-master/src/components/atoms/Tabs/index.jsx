import React from "react";
import { Tabs } from "antd";

export const { TabPane } = Tabs;

const Tab = ({ children, ...rest }) => {
  return <Tabs {...rest}>{children}</Tabs>;
};

export default Tab;
