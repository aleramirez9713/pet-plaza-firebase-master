import React from "react";
import { Button, Card, Descriptions } from "../../atoms";
import { constructDescription } from "../../../hooks";
import "./style.css";

const CardInfo = (props) => {
  let actions = [];
  let descriptions = constructDescription(props.info);
  if (props.actions) {
    props.actions.forEach((element) => {
      actions.push(
        <Button type="link" onClick={element.onClick}>
          {element.text}
        </Button>
      );
    });
  }

  return (
    <Card style={{width: props.width ? props.width : 500}} actions={actions} >
      <div className="description-card">
        <Descriptions
          size="middle"
          title={props.title}
          bordered
          column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          {descriptions.map((description) => description.element)}
        </Descriptions>
      </div>
    </Card>
  );
};

export default CardInfo;
