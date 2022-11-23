import React from "react";
import { Button,Icon } from '../../atoms';
import './style.css'

const NextButton = ({text,...rest}) => {
  return (
    <div className="content-footer">
      <Button
        {...rest}
      >
        {text}
        <Icon name="RightOutlined" />
      </Button>
    </div>
  );
};

export default NextButton;
