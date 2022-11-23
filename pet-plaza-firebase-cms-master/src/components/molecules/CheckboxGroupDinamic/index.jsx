import React from "react";
import { Checkbox, Group, Row, Col } from "../../atoms";

const CheckboxGroupDinamic = ({ onChange, checkboxs }) => {
  return (
    <Group style={{ width: "100%" }} onChange={onChange}>
      <Row>
        {checkboxs.map((check) => (
          <Col span={6} key={check.value}>
            <Checkbox value={check.value} disabled={check.disabled}>{check.label}</Checkbox>
          </Col>
        ))}
      </Row>
    </Group>
  );
};

export default CheckboxGroupDinamic;
