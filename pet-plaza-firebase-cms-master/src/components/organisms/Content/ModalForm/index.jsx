import React from "react";
import { Forms } from "../../../molecules";
import { Modal, Spin, Space, Col } from "../../../atoms";
import "./style.css";

const ModalForm = (props) => {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      width={props.width}
      footer={null}
      forceRender
    >
      <Spin spinning={props.spinning}>
        <Space direction="vertical">
          {props.extra ? (
            <Col span={24} className="style-extra-section">
              {props.extra}
            </Col>
          ) : null}
          <Col
            span={24}
            className={
              props.extra
                ? props.extraStyle2
                  ? "style-form-2"
                  : "style-form"
                : ""
            }
          >
            <Forms
              name={props.name}
              validateTrigger={props.validateTrigger}
              image={props.image}
              initialValues={props.initialValues}
              onValuesChange={props.onValuesChange}
              validateStatus={props.validateStatus}
              disabledPrimaryButton={props.disabledPrimaryButton}
              onCancel={props.onCancel}
              onFinish={props.onFinish}
              onFinishFailed={props.onFinishFailed}
              beforeUpload={props.beforeUpload}
              fields={props.fields}
              primaryButton={props.primaryButton}
              defaultButton={props.defaultButton}
              form={props.form}
              rules={props.rulesImage}
              listFile={props.listFile}
              layout={props.layout}
            />
          </Col>
        </Space>
      </Spin>
    </Modal>
  );
};

export default ModalForm;
