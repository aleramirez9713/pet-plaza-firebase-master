import React from "react";
import { Form, Tooltip, Icon, Space, Button, Row, Col } from "../../atoms";
import "./style.css";

const FieldsForm = (props) => {
  return props.fields.map((field, i) =>
    field.dinamic ? (
      <Form.List key={`${field.name}Key`} name={field.name}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field2, i) => (
                <Space key={field2.key} className="style-form-list-items">
                  <Icon
                    name="DeleteOutlined"
                    style={{ fontSize: 20, marginTop: 5 }}
                    onClick={() => {
                      remove(field2.name);
                    }}
                  />
                  <Row>
                    {field.title && (
                      <Col span={24} style={{ padding: 5 }}>{`${field.title} ${
                        parseInt(i, 10) + 1
                      }`}</Col>
                    )}
                      {field.fields.map((e, i) => (
                        <Col span={e.span ? e.span : 10} key={i} style={{padding: 7}}>
                          <Form.Item
                            {...field2}
                            label={e.label}
                            name={[field2.name, e.name]}
                            fieldKey={[field2.fieldKey, e.name]}
                            rules={
                              e.message
                                ? [{ required: true, message: e.message }]
                                : undefined
                            }
                          >
                            {e.component}
                          </Form.Item>
                        </Col>
                      ))}
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <Icon name="PlusOutlined" /> {field.buttonLabel}
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    ) : (
      props.validateStatus.map((validate, j) =>
        field.list && i === j ? (
          field.component
        ) : i === j ? (
          field.tooltip ? (
            <Tooltip
              key={i}
              placement={field.tooltip ? field.tooltip.placement : null}
              title={
                field.tooltip ? (
                  <span>
                    <Icon name="ExclamationCircleOutlined" />{" "}
                    {field.tooltip ? field.tooltip.text : null}
                  </span>
                ) : null
              }
            >
              <Form.Item
                label={field.label}
                name={field.name}
                validateStatus={
                  field.validateStatus ? validate : field.validateStatus
                }
                hasFeedback={field.hasFeedback}
                valuePropName={field.valuePropName}
                rules={
                  field.message
                    ? [
                        {
                          required: true,
                          message: field.message,
                        },
                      ]
                    : []
                }
              >
                {field.component}
              </Form.Item>
            </Tooltip>
          ) : (
            <Form.Item
              key={i}
              label={field.label}
              name={field.name}
              validateStatus={
                field.validateStatus ? validate : field.validateStatus
              }
              hasFeedback={field.hasFeedback}
              valuePropName={field.valuePropName}
              rules={
                field.message
                  ? [
                      {
                        required: true,
                        message: field.message,
                      },
                    ]
                  : []
              }
            >
              {field.component}
            </Form.Item>
          )
        ) : null
      )
    )
  );
};
export default FieldsForm;
