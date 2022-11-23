import React, { useState } from "react";
import { Avatar } from "../";
import { Card, Meta, Icon } from "../../atoms";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useUser } from "../../../Context";
import { middleware } from "../../../Middleware";
import "./style.css";

const recursiveOptions = (option, onClose, userInfo) => {
  if (middleware(option.limits, userInfo.role)) {
    if (option.subMenu.length > 0) {
      return (
        <Menu.SubMenu
          title={
            <div className="sub-menu">
              <Icon name={option.icon} className="icon-menu" />
              {option.name}
            </div>
          }
          key={option.key}
        >
          {option.subMenu.map((subItem) =>
            recursiveOptions(subItem, onClose, userInfo)
          )}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item className='item-menu' key={option.key}>
            <Link
              key={`ref:${option.location}`}
              to={option.location}
              onClick={onClose}
            >
              <Icon name={option.icon} className="icon-menu" />
              {option.name}
            </Link>
        </Menu.Item>
      );
    }
  }
};

const Menus = (props) => {
  const { userInfo } = useUser();
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="side-menu"
    >
      <div key="card-user">
        <Card
          className="avatar"
          cover={
            userInfo.photoURL ? (
              <Avatar size={60} src={userInfo.photoURL} />
            ) : (
              <Avatar size={60} icon="UserOutlined" />
            )
          }
        >
          <Meta
            title={<h4 className="avatar-menu-text">{userInfo.displayName}</h4>}
            description={
              <div className="avatar-menu-text">
                <span>{userInfo.role}</span>
              </div>
            }
            style={{ textAlign: "center" }}
          />
        </Card>
      </div>
      {props.sideMenuOptions
        ? props.sideMenuOptions.map((option) =>
            recursiveOptions(option, props.onClose, userInfo)
          )
        : null}
    </Menu>
  );
};
export default Menus;
