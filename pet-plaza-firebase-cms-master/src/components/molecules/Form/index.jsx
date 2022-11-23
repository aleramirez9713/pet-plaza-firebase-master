import React, { useState } from "react";
import {
  Form,
  Upload,
  Button,
  Row,
  Col,
  Space,
  Icon,
  confirm,
  Image,
} from "../../atoms";
import { beforeUpload } from "../../../hooks";
import { FieldsForm } from "../../molecules";
import { functionsURL } from "../../../Firebase/conection";

import "./style.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const Forms = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const uploadButton = (
    <div>
      {loading ? <Icon name="LoadingOutlined" /> : <Icon name="PlusOutlined" />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const view = (file) => {
    confirm({
      title: "Imagen",
      content: <Image source={file.thumbUrl} className="modal-image" />,
      onOk() {},
      onCancel() {},
      cancelButtonProps: { disabled: true, type: "link" },
      okText: "Salir",
      cancelText: " ",
      maskClosable: true,
    });
  };

  const normFile = (e) => {
    const isJpgOrPng =
      e.file.type === "image/jpeg" || e.file.type === "image/png";
    const isLt1M = e.file.size / 1024 / 1024 < 0.15;
    if (isJpgOrPng && isLt1M) {
      if (props.listFile) {
        return e.fileList;
      } else {
        return e.file;
      }
    } else {
      if (props.listFile) {
        return null;
      } else {
        setImageUrl("");
      }
    }
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  return (
    <>
      <Form
        name={props.name ? props.name : "basic"}
        form={props.form}
        onValuesChange={props.onValuesChange}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        initialValues={props.initialValues}
        validateTrigger={props.validateTrigger}
        layout={props.layout}
      >
        <Row>
        <Col
            lg={{ span: props.image ? 16 : 24 }}
            md={{ span: props.image ? 16 : 24 }}
            sm={{ span: props.image ? 16 : 24 }}
            xs={{ span: 24 }}
            className={props.image ? "fields-form-with-image" : "fields-form"}
          >
            <div>
              <FieldsForm
                fields={props.fields}
                validateStatus={props.validateStatus}
              />
            </div>
          </Col>
          {props.image ? (
            <Col
              lg={{ span: 6 }}
              md={{ span: 6 }}
              sm={{ span: 6 }}
              xs={{ span: 24 }}
              className={
                props.fields.length > 3
                  ? "upload-position-xl"
                  : "upload-position"
              }
            >
              <Form.Item
                name="upload"
                valuePropName={props.listFile ? "fileList" : "file"}
                getValueFromEvent={normFile}
                rules={
                  props.rules
                    ? [
                        {
                          required: true,
                          message: "Ingrese una imagen aceptable",
                        },
                      ]
                    : null
                }
              >
                <Upload
                  accept=".jpg,.jpeg,.png"
                  name="avatar"
                  listType="picture-card"
                  onPreview={view}
                  multiple={props.listFile ? true : false}
                  className="avatar-uploader"
                  showUploadList={props.listFile ? true : false}
                  action={`${functionsURL}/responseImage`}
                  beforeUpload={
                    props.beforeUpload ? props.beforeUpload : beforeUpload
                  }
                  onChange={handleChange}
                >
                  {imageUrl && !props.listFile ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
          ) : null}
          <Col span={24}>
            <Space className="buttons-form">
              {props.defaultButton ? (
                <Form.Item>
                  <Button
                    onClick={() => {
                      setImageUrl("");
                      setLoading(false);
                      props.onCancel();
                    }}
                  >
                    Cancelar
                  </Button>
                </Form.Item>
              ) : null}
              <Form.Item>
                {props.primaryButton ? (
                  <Button
                    htmlType="submit"
                    disabled={props.disabledPrimaryButton}
                    onClick={() => {
                      setImageUrl("");
                      if (props.onClick) {
                        props.onClick();
                      }
                    }}
                    type="primary"
                  >
                    {props.primaryButton}
                  </Button>
                ) : null}
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Forms;
