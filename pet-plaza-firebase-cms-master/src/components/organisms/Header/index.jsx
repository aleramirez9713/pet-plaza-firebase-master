import React from "react";
import { Image, Col, Button, Icon, Header,Space } from "../../atoms";
import { Notification } from "../../molecules";
import { Link } from "react-router-dom";
import "./style.css";

const Level_1 = ({
  authed,
  view,
  sourceImg,
  classImg,
  showDrawer,
  onClick,
}) => {
  return (
    <Header className="header-lv1">
        <Col className="col-lv1" span={view ? 3 : 1}>
          {authed
            ? !view && (
              <div className="div-buttons">
                <Button shape="circle" type="link" size="large" onClick={showDrawer}>
                  <Icon name="MenuOutlined" className="icon-size" />
                </Button>
              </div>
              )
            : null}
        </Col>
        <Col className="col-lv1" span={view ? 18 : 14}>
          <Link to="/login">
            <Image preview={false} source={sourceImg} className={classImg} />
          </Link>
        </Col>
        <Col className="col-lv1" span={view ? 3 : 1}>
          {authed ? (
            <Space>
              <Notification className="div-buttons" />
              <div className="div-buttons">
                <Button type="link" shape="circle" size="large" onClick={onClick}>
                  <Icon name="ExportOutlined" className="icon-size" />
                </Button>
              </div>
            </Space>
          ) : null}
        </Col>
    </Header>
  );
};
export default Level_1;
