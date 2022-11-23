import React, { useState } from "react";
import { ModalForm } from "../../organisms";
import { Input, Form, message } from "../../atoms";
import { recoveryPassword, getToken } from "../../../hooks";

const TSendMail = ({ visible, onCancel }) => {
  const [validate, setvalidate] = useState("");
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  const Validate = (changedValues) => {
    try {
      if (changedValues.email) {
        changedValues.email.match(/([a-z]|[0-9])([@])([a-z])/g)
          ? setvalidate("success")
          : setvalidate("error");
      }
    } catch (error) {
      if (validate.length > 0) {
        Review("email") ? setvalidate("") : setvalidate(validate);
      }
    }
  };

  const Review = (field) => {
    if (form.getFieldValue(field).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onFinish = async (values) => {
    setloading(true);
    let token = await getToken();
    let response = await recoveryPassword(token.token, values, document.domain);
    if (response.success) {
      message.success(response.message);
    } else {
      message.error("Error: El correo no fue enviado.");
    }
    onCancel();
    setvalidate("");
    setloading(false);
  };

  return (
    <ModalForm
      extra={
        <span>
          * Ingrese el usuario registrado (correo electrónico con el que inicia
          sesión), para recibir los pasos de recuperación de contraseña
        </span>
      }
      title="Recuperar contraseña"
      name="recovery-pass"
      visible={visible}
      onCancel={()=>{
        onCancel();
        setvalidate("");
      }}
      spinning={loading}
      onValuesChange={Validate}
      validateStatus={[validate]}
      disabledPrimaryButton={validate === "success" ? false : true}
      onFinish={onFinish}
      fields={[
        {
          name: "email",
          label: "Email",
          validateStatus: true,
          hasFeedback: true,
          message: "Ingrese el email",
          component: <Input placeholder="email" />,
        },
      ]}
      primaryButton="Enviar"
      form={form}
    />
  );
};

export default TSendMail;
