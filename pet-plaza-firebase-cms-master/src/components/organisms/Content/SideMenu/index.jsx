import React from "react";
import { Sider } from "../../../atoms";
import { Menu } from "../../../molecules";
import "./styles.css";

const SideMenu = (props) => {
  return (
    <Sider width={250} className="sider-menu">
      <Menu
        sideMenuOptions={props.sideMenuOptions}
        onClick={props.onClick}
        popover={props.popover}
        placement={props.placement}
      />
    </Sider>
  );
};
export default SideMenu;
