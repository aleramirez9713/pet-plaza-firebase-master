import React from "react";
import { Avatar } from "antd";
import { Icon } from "../../atoms";

const Avatars = ({ icon,style, ...rest }) => {
  return (
    <Avatar
      {...rest}
      icon={<Icon name={icon} />}
      style={style? style :{ marginTop: "20%" }}
    />
  );
};
export default Avatars;
