import React from "react";
import { Button, Icon } from "../../atoms";

const ButtonLocationMap = ({onClick}) => {
  return (
  <Button type="link" onClick={onClick}>
      <Icon name="EnvironmentOutlined" />
  </Button>);
};

export default ButtonLocationMap;
