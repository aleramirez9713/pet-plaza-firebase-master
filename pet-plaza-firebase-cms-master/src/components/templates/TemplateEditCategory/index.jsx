import React, { Fragment, useState, useEffect } from "react";
import { message, confirm, Icon } from "../../atoms";
import { fieldsFormEditCategories } from "../../../consts";
import {
  getToken,
  getLastPosition,
  updateTypeStore,
  beforeUpload,
} from "../../../hooks";
import { ModalForm } from "../../organisms";
import { ButtonEdit } from "../../molecules";

const TEditCategory = (props) => {
  const [disabledPrimaryButton, setDisabledPrimaryButton] = useState(true);
  const [lastPosition, setLastPosition] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState("");

  const update = async (values) => {
    setLoading(true);
    for (let field in values) {
      for (let key in props.info) {
        if (field === key) {
          if (values[field] === props.info[key]) {
            delete values[field];
          }
        }
      }
    }
    let token = await getToken();
    if (token.success) {
      let response = await updateTypeStore(
        token.token,
        values,
        props.id
      );
      if (response.success) {
        props.resetData();
      } else {
        message.error(response);
      }
    } else {
      message.error(token.error);
    }
    setLoading(false);
    props.onCancel();
    props.form.resetFields();
  };

  const onFinish = async (values) => {
    if (validate === "warning") {
      confirm({
        title: "Confirmación",
        icon: <Icon name="ExclamationCircleOutlined" />,
        content:
          "La posición que ingreso ya esta ocupada, ¿desea hacer el cambio?",
        okText: "Aceptar",
        cancelText: "Cancelar",
        async onOk() {
          update(values);
        },
        onCancel() {
          props.form.setFieldsValue({
            position: props.info.position,
          });
        },
      });
    } else {
      update(values);
    }
  };

  const Validate = async (value, values) => {
    if (
      values.name === props.info.name &&
      values.position === props.info.position &&
      values.active === props.info.active
    ) {
      setDisabledPrimaryButton(true);
    } else {
      setDisabledPrimaryButton(false);
    }
    let temp = [];
    for (let i in lastPosition) {
      if (
        values.position === lastPosition[i] &&
        values.position !== props.info.position
      ) {
        temp.push(1);
      } else {
        temp.push(0);
      }
    }
    if (
      typeof props.form.getFieldValue("position") === ("string" || "object") ||
      props.form.getFieldValue("position") === "" ||
      props.form.getFieldValue("position") === 0
    ) {
      setValidate("error");
    } else {
      setValidate("success");
    }
    for (let i in temp) {
      if (temp[i] === 1) {
        setValidate("warning");
      }
    }
  };

  useEffect(() => {
    const position = async () => {
      let response = await getLastPosition("types");
      if (response.success) {
        setLastPosition(response.data);
      } else {
        setLastPosition("Error");
      }
    };
    position();
  }, [props.info.color]);

  return (
    <Fragment>
      <ButtonEdit onClick={props.onClick} />
      <ModalForm
        title="Editar categoría"
        visible={props.visible}
        onCancel={props.onCancel}
        spinning={loading}
        validateStatus={[0, validate, 0]}
        initialValues={props.initialValues}
        onFinish={onFinish}
        onValuesChange={Validate}
        disabledPrimaryButton={
          !disabledPrimaryButton && validate !== "error" ? false : true
        }
        beforeUpload={beforeUpload}
        fields={fieldsFormEditCategories}
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={props.form}
      />
    </Fragment>
  );
};

export default TEditCategory;
