import React, { useState } from "react";
import { Row, Col, Title, Space, Form, Card, Image } from "../../atoms";
import { Avatar, ButtonEdit } from "../../molecules";
import { useUser } from "../../../Context";
import { TConfig } from "../../templates";
import "./style.css";

const Config = () => {
  const [visible, setvisible] = useState(false);
  const [changePassword, setchangePassword] = useState(false);
  const [form] = Form.useForm();
  const { userInfo } = useUser();

  const ShowChangePassword = () => {
    setchangePassword(true);
    setvisible(true);
  };
  const ShowChangeInfo = () => {
    setchangePassword(false);
    form.setFieldsValue({
      fullName: userInfo.displayName,
      email: userInfo.email,
    });
    setvisible(true);
  };

  return (
    <div className="config-content">
      <Card hoverable style={{ padding: 15 }}>
        <Row>
          <Col span={12} className="config-image">
            {userInfo.photoURL ? (
              <Image
                preview={false}
                size={160}
                className="image-profile"
                src={userInfo.photoURL}
              />
            ) : (
              <Avatar size={160} icon="UserOutlined" />
            )}
          </Col>
          <Col span={12}>
            <div className="config-text">
              <Title level={1}>{userInfo.displayName}</Title>
              <Title level={4} style={{ textAlign: "start" }}>
                {userInfo.email}
              </Title>
              <Title level={4} style={{ textAlign: "start" }}>
                {userInfo.role}
              </Title>
            </div>
            <Space>
              <ButtonEdit
                text="Cambiar contraseña"
                onClick={ShowChangePassword}
              />
              <ButtonEdit
                text="Actualizar información"
                onClick={ShowChangeInfo}
              />
            </Space>
          </Col>
          <TConfig
            visible={visible}
            onCancel={() => setvisible(false)}
            form={form}
            data={userInfo}
            changePassword={changePassword}
          />
        </Row>
      </Card>
    </div>
  );
};

export default Config;
