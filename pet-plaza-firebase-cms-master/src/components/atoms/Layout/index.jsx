import React from "react";
import { Layout } from "antd";
import "./style.css";

const { Content, Sider, Header, Footer } = Layout;

export { Content, Sider, Header, Footer };

const Layouts = ({ children, className, ...rest }) => {
  return (
    <Layout className={className + " layout-heigth"} {...rest}>
      {children}
    </Layout>
  );
};

export default Layouts;
