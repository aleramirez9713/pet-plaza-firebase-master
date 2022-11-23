import React, { useState } from "react";
import { message } from "../../atoms";
import { ModalForm } from "../../organisms";
import {
  fieldsFormEditTypeApointment,
  fieldsFormNewTypeApointment,
} from "../../../consts";
import {
  setTypeApointment,
  updateTypeApointment,
  getToken,
} from "../../../hooks";

const TMTypeApointment = ({ title, visible, onCancel, form, edit, id, getData }) => {
  const [loading, setloading] = useState(false);

  const onFinish = async (values) => {
    setloading(true);
    let token = await getToken();
    let res = edit
      ? await updateTypeApointment(token.token, id, values)
      : await setTypeApointment(token.token, values);
    if (res.success) {
      message.success(res.message);
      getData();
    } else {
      message.error("Hubo un error en la accion requerida.");
    }
    onCancel();
    setloading(false);
  };

  return (
    <ModalForm
      title={title}
      visible={visible}
      onCancel={onCancel}
      spinning={loading}
      validateStatus={[0, 0]}
      onFinish={onFinish}
      onFinishFailed={() => message.error("No dejar campos vacios")}
      fields={edit ? fieldsFormEditTypeApointment : fieldsFormNewTypeApointment}
      primaryButton="Guardar"
      defaultButton="Cancelar"
      form={form}
    />
  );
};

export default TMTypeApointment;
