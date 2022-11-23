import React from "react";
import { Button, Icon } from "../../atoms";

const ButtonEdit = ({onClick,table,text}) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      icon={<Icon name="EditOutlined" />}
    >
      {
        !table
        ?text
         ? text
         : "Actualizar"
        :null
      }
    </Button>
  );
};

export default ButtonEdit;
