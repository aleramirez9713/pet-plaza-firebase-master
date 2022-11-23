import React from "react";
import { Modal, Image, Row, Col, Button, Spin, Space, Icon } from "../../atoms";
import "./style.css";
import { ButtonEdit } from "../";

const ModalImage = ({ title, visible, onCancel, onClick, loading, image, prevArrow, nextArrow, text }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Spin spinning={loading ? loading : false}>
        <Row>
          <span>{text}</span>
          <Col span={24} className="content-image">
            <Button onClick={prevArrow} icon={<Icon name="CaretLeftOutlined" />} />
            <Image preview={false} source={image} className="size-image" />
            <Button onClick={nextArrow} icon={<Icon name="CaretRightOutlined" />} />
          </Col>
          {onClick ? (
            <Col span={24} className="button-delete">
              <Space>
                {onClick.remove ? (
                  <Button danger type="primary" onClick={onClick.remove}>
                    Eliminar Imagen
                  </Button>
                ) : null}
                {onClick.edit ? <ButtonEdit onClick={onClick.edit} /> : null}
              </Space>
            </Col>
          ) : null}
        </Row>
      </Spin>
    </Modal>
  );
};

export default ModalImage;
