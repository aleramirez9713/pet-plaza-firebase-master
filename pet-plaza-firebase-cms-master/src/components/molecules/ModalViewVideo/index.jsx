import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Modal, Row, Col, Spin, Button, Space } from "../../atoms";
import { ButtonEdit } from "../";
import "./style.css";

const ModalViewVideo = (props) => {
  const [loading, setloading] = useState(true);
  const onChange = (e) => {
    if (e) {
      setloading(false);
    }
  };
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={() => {
        props.onCancel();
        setloading(true);
      }}
      footer={null}
      width={1200}
      centered
    >
      <Spin spinning={props.loading ? props.loading : loading}>
        <Row>
          <Col span={24} className="pictures-video">
            <ReactPlayer
              playing
              onReady={onChange}
              url={props.video}
              controls
              width="100%"
              height="100%"
            />
          </Col>
          {props.onClick ? (
            <Col span={24} className="button-delete">
              <Space>
                {props.onClick.remove ? (
                  <Button danger type="primary" onClick={props.onClick.remove}>
                    Eliminar Vídeo
                  </Button>
                ) : null}
                {props.onClick.edit ? (
                  <ButtonEdit onClick={props.onClick.edit} />
                ) : null}
              </Space>
            </Col>
          ) : null}
        </Row>
      </Spin>
    </Modal>
  );
};

export default ModalViewVideo;
