import React, { useState } from "react";
import { ModalForm } from "../../organisms";
import {
  fieldsFormConfigInfo,
  fieldsFormConfigPassword,
} from "../../../consts";
import {
  removeStorage,
  setStorage,
  reAuth,
  getToken,
  changeCurrentPassword,
  changeUserInfo,
} from "../../../hooks";
import { useUser } from "../../../Context";
import { message, confirm, Icon } from "../../atoms";

const TConfig = ({ visible, onCancel, form, changePassword, data }) => {
  const { userInfo } = useUser()
  const [validateUser, setValidateUser] = useState("");
  const [validatePassword, setvalidatePassword] = useState("");
  const [validateFirtPassword, setvalidateFirtPassword] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [loading, setloading] = useState(false);

  const Validate = (value, values) => {
    if (values["first-password"] === values.password) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
    try {
      if (value.email) {
        value.email.match(/([a-z]|[0-9])([@])([a-z])/g)
          ? setValidateUser("success")
          : setValidateUser("error");
      }
      if (value["first-password"]) {
        value["first-password"].match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/g
        )
          ? setvalidateFirtPassword("success")
          : setvalidateFirtPassword("error");
      }
      if (value.password) {
        value.password.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/g
        )
          ? setvalidatePassword("success")
          : setvalidatePassword("error");
      }
    } catch (error) {
      if (validateUser.length > 0) {
        Review("username")
          ? setValidateUser("")
          : setValidateUser(validateUser);
      }
      if (validatePassword.length > 0) {
        Review("password")
          ? setvalidatePassword("")
          : setvalidatePassword(validateUser);
      }
      if (validateFirtPassword.length > 0) {
        Review("first-password")
          ? setvalidateFirtPassword("")
          : setvalidateFirtPassword(validateUser);
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

  const changeInfo = async (token, values) => {
    let response = await changeUserInfo(token.token, values, userInfo.role);
    if (response.success) {
      message.success(response.message);
      setvalidateFirtPassword("");
      setvalidatePassword("");
      setValidateUser("");
    } else {
      message.error("Error en el servidor.");
    }
    onCancel();
    form.resetFields();
    setloading(false)
    document.location.reload();
  };

  const onFinish = async (values) => {
    setloading(true);
    let token = await getToken();
    if (changePassword) {
      let correct = await reAuth(data.email, values.currentPassword);
      if (correct) {
        let response = await changeCurrentPassword(token.token, values);
        if (response.success) {
          message.success(response.message);
          onCancel();
          form.resetFields();
          setvalidateFirtPassword("");
          setvalidatePassword("");
          setValidateUser("");
        } else {
          message.error("Error en el servidor.");
        }
      } else {
        message.error("Error: Contraseña actual incorrecta");
      }
      setloading(false)
    } else {
      for (let field in values) {
        for (let key in data) {
          if (field === key) {
            if (values[field] === data[key]) {
              delete values[field];
            }
          }
        }
      }
      if (!values.upload) {
        delete values.upload;
      } else {
        if (data.profile) {
          await removeStorage(data.profile);
        }
        let file = values.upload.originFileObj;
        let taskRef = await setStorage(file, `profile/${data.name}`);
        if (taskRef.success) {
          let imageRef = taskRef.imageRef[0];
          let downloadURL = imageRef.ref.getDownloadURL();
          delete values.upload;
          values.profile = await downloadURL;
        } else {
          values.profile = "";
        }
      }
      if (values.email) {
        confirm({
          title: "Confirmación",
          icon: <Icon name="ExclamationCircleOutlined" />,
          width: 600,
          content: (
            <div>
              Se va modificar el email actual: <h3>{data.email}</h3> al nuevo
              email: <h3>{values.email}</h3> debe considerar que:
              <ul>
                <li>
                  Los correos que se manden de esta plataforma seran enviados al nuevo email.
                </li>
                <li>La sesión se cerrara al finalizar esta acción.</li>
                <li>
                  Si hubo un error al redactar el email de manera inconciente,
                  comuniquese con los administradores generales de esta
                  plataforma.
                </li>
              </ul>
            </div>
          ),
          okText: "Aceptar",
          cancelText: "Cancelar",
          async onOk() {
            changeInfo(token, values);
          },
          onCancel() {},
        });
      } else {
        changeInfo(token, values);
      }
    }
  };

  const Cancel = () => {
    onCancel();
    form.resetFields();
    setvalidateFirtPassword("");
    setvalidatePassword("");
    setValidateUser("");
  };

  return (
    <ModalForm
      extraStyle2
      extra={
        <div>
          {validatePassword === "error" || validateFirtPassword === "error" ? (
            validatePassword === "error" || validateFirtPassword === "error" ? (
              <p style={{ color: "red" }}>
                * La contraseña debe tener minimo 6 carácteres, tener una
                mayúscula, un número y un carácter especial (#?!@$%^&*-_).
              </p>
            ) : null
          ) : undefined}
          {disabled &&
          validatePassword === "success" &&
          validateFirtPassword === "success" ? (
            <div>
              <span style={{ color: "red" }}>
                * Las contraseñas cumplen con los requisitos para una contraseña
                en Pronto Admin, pero no son iguales.
              </span>
              <p>* Habilite el ojó para poder visualizar su contraseña.</p>
            </div>
          ) : null}
        </div>
      }
      name="update-info-current-user"
      title="Editar Informacion"
      visible={visible}
      onCancel={Cancel}
      spinning={loading}
      image={!changePassword}
      validateStatus={[validateUser, validateFirtPassword, validatePassword]}
      onFinish={onFinish}
      disabledPrimaryButton={
        changePassword
          ? validatePassword === "success" &&
            validateFirtPassword === "success" &&
            !disabled
            ? false
            : true
          : false
      }
      onValuesChange={Validate}
      fields={changePassword ? fieldsFormConfigPassword : fieldsFormConfigInfo}
      primaryButton="Guardar"
      defaultButton="Cancelar"
      form={form}
    />
  );
};

export default TConfig;
