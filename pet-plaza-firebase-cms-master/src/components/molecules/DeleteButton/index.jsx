import React from "react";
import { Button, Icon } from "../../atoms";

const DeleteButton = ({ onClick }) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      icon={<Icon name="DeleteOutlined" />}
      danger
    />
  );
};

export default DeleteButton;
