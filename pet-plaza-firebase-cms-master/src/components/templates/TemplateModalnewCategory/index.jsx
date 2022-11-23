import React, { Fragment, useState, useEffect } from "react";
import { message, Form } from "../../atoms";
import {
  getToken,
  getLastPosition,
  setTypeStore,
} from "../../../hooks";
import { fieldsFormCategories } from "../../../consts";
import { ModalForm } from "../../organisms";
import { ButtonAdd } from "../../molecules";

const TNewCategory = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPosition, setLastPosition] = useState([]);
  const [validate, setValidate] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const position = async () => {
      let response = await getLastPosition("types");
      if (response.success) {
        form.setFieldsValue({
          position: response.data.length > 0 ? response.data[0] + 1 : 0,
        });
        setLastPosition(response.data);
      } else {
        form.setFieldsValue({
          position: 0,
        });
      }
    };
    position();
  }, [form,visible]);

  const Validate = (changedValues) => {
    let temp = [];
    for (let i in lastPosition) {
      if (changedValues.position === lastPosition[i]) {
        temp.push(1);
      } else {
        temp.push(0);
      }
    }
    if (
      typeof form.getFieldValue("position") === ("string" || "object") ||
      form.getFieldValue("position") === "" ||
      form.getFieldValue("position") === 0
    ) {
      setValidate("error");
    } else {
      setValidate("success");
    }
    for (let i in temp) {
      if (temp[i] === 1) {
        setValidate("error");
      }
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    values.totalProducts = 0;
    values.active = true;
    values.type = props.type
    let token = await getToken();
    if (token.success) {
      let response = await setTypeStore(token.token, values);
      if (response.success) {
        message.success(response.message);
        props.loadData();
      } else {
        message.error(response);
      }
    } else {
      message.error(token.error);
    }
    setVisible(false);
    setLoading(false);
    form.resetFields();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const beforeUpload = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("Solo puede subir archivos PNG.");
    }
    const isLt1K = file.size / 1024 / 1024 < 0.1;
    if (!isLt1K) {
      message.error("La imagen no puede superar los 100 Kb.");
    }
    return isPng && isLt1K;
  };

  return (
    <Fragment>
      <ButtonAdd onClick={showModal} text="Agregar Categoría" />
      <ModalForm
        title="Nueva categoría"
        visible={visible}
        onCancel={handleCancel}
        spinning={loading}
        onValuesChange={Validate}
        validateStatus={[0, validate]}
        disabledPrimaryButton={validate === "success" ? false : true}
        onFinish={onFinish}
        onFinishFailed={() =>message.error("No dejar campos vacíos")}
        beforeUpload={beforeUpload}
        fields={fieldsFormCategories}
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={form}
      />
    </Fragment>
  );
};
export default TNewCategory;
