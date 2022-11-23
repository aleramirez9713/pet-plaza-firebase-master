import React, { useState, useEffect } from "react";
import {
  Header1,
  Footer,
  Content,
  SideMenu,
  DrawerMenu,
} from "../../organisms";
import { Layout, Row, Col } from "../../atoms";
import "./style.css";

const TemplateHome = (props) => {
  const [view, setView] = useState(true);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const updateSize = () => {
    if (window.innerWidth < 900) {
      setView(false);
    } else {
      setView(true);
    }
  };

  useEffect(() => {
    updateSize();
  }, []);

  window.addEventListener("resize", updateSize);
  return (
    <Layout>
      <Header1
        sourceImg={props.sourceImg}
        classImg={props.classImg}
        onClick={props.onClick}
        authed={props.authed}
        view={view}
        showDrawer={showDrawer}
      />
      <Layout>
        {props.authed ? (
          view ? (
            <SideMenu
              sideMenuOptions={props.sideMenuOptions}
            />
          ) : (
            <DrawerMenu
              visible={visible}
              onClose={onClose}
              sideMenuOptions={props.sideMenuOptions}
              bodyStyle={{ padding: 0, overflowX: "hidden" }}
            />
          )
        ) : null}
        <Row className="my-row-style">
          <Col className="my-col-style">
            <Content component={props.component} />
            <Footer text={<p className="my-footer-style">{props.text}</p>} />
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
};
export default TemplateHome;
