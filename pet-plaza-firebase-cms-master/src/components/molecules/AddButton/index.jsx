import React from "react";
import { Button, Icon } from "../../atoms";

const ButtonAdd = ({onClick,text,type}) => {
  return (
    <Button
      type={type ? type : "primary"}
      onClick={onClick}
      icon={<Icon name="PlusOutlined" />}
    >
     {text}
    </Button>
  );
};

export default ButtonAdd;
