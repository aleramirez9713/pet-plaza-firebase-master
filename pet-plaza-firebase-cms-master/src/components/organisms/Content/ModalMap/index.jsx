import React, { useState, useEffect } from "react";
import { Modal, Spin, Col, Map, Row } from "../../../atoms";
import "./style.css";

const ModalMap = ({ coordinates, name, visible, onCancel }) => {
  const [positions, setpositions] = useState({});

  useEffect(() => {
    setpositions({
      lat: coordinates.latitude,
      lng: coordinates.longitude,
    });
  }, [coordinates]);

  return (
    <Modal
      title="Mapa"
      visible={visible}
      onCancel={() => {
        onCancel();
        setpositions({
          lat: null,
          lng: null,
        });
      }}
      footer={null}
    >
      <Row className="content-modal-map">
        <Col span={24} className="content-map">
          {positions.lat && positions.lng ? (
            <Map positions={positions} name={name} className="content-map" zoom={18} />
          ) : visible ? (
            <Spin />
          ) : null}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalMap;
