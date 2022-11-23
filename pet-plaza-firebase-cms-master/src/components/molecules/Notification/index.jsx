import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Dropdown, Button, Icon, Badge } from "../../atoms";
import { Link } from "react-router-dom";
import { useUser } from "../../../Context";
import "./style.css";

const Notification = ({ className }) => {
  const { notifications, setNotifications } = useUser();
  const [notify, setnotify] = useState(0);
  const [notifyList, setnotifyList] = useState([]);

  const buildList = (notifications) => {
    setnotifyList((prevState) => {
      setnotify(notifications.length);
      let newNotifications = [];
      for (let i = notifications.length - 1; i >= 0; i--) {
        newNotifications.push(notifications[i]);
      }
      let temp = newNotifications.concat(prevState);
      return [...new Set(temp)];
    });
  };

  useEffect(() => {
    buildList(notifications);
  }, [notifications]);

  const Visible = (visible) => {
    if (visible) {
      setNotifications([]);
      setnotify(0);
    }
  };

  const menu = (
    <Menu>
      {notifyList.length > 0 ? (
        notifyList.map((item) => {
          let heading;
          try {
            heading = JSON.parse(item.heading);
          } catch (error) {
            heading = item.heading;
          }
          return (
            <Menu.Item key={item.id}>
              <Link to={heading.path ? heading.path :'/'}>
                <div className="card-notification">
                  <b className="title-notification">
                    {heading.title ? heading.title : heading}
                  </b>
                  <p className="text-notification">{item.content}</p>
                </div>
              </Link>
            </Menu.Item>
          );
        })
      ) : (
        <Menu.Item key="1">
          <p className="without-notifications">No hay notificaciones</p>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomCenter" onVisibleChange={Visible}>
      <div className={className}>
        <Button shape="circle" type="link" size="large">
          <Badge count={notify}>
            <Icon name="BellOutlined" className="icon-size" />
          </Badge>
        </Button>
      </div>
    </Dropdown>
  );
};

export default Notification;
