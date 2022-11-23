import React from "react";
import { Drawer } from "../../../atoms";
import { Menu } from "../../../molecules";

const DrawerMenu = (props) => {
  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
      bodyStyle={props.bodyStyle}
    >
      <Menu
        sideMenuOptions={props.sideMenuOptions}
        onClick={props.onClick}
        popover={props.popover}
        placement={props.placement}
        onClose={props.onClose}
      />
    </Drawer>
  );
};
export default DrawerMenu;
