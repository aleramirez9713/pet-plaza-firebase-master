import React, { Fragment, useEffect, useState } from "react";
import { ModalForm } from "../../organisms";
import {
  removeElementFromArray,
  setCollaborator,
  getToken,
  uploadCollaborator,
  getRolesForSelect,
  stringToNumber
} from "../../../hooks";
import {
  fieldsFormCollaborator,
  fieldsFormNewCollaborator,
} from "../../../consts";
import { DinamicSelect } from "../../molecules";
import { message } from "../../atoms";

const TMCollaborator = ({
  visible,
  onCancel,
  form,
  title,
  data,
  getData,
  setTitle,
  userInfo,
}) => {
  const [disabled, setdisabled] = useState(true);
  const [loading, setloading] = useState(false);
  const [validateUser, setValidateUser] = useState("");
  const [validatePhone, setvalidatePhone] = useState("")

  useEffect(() => {
    const setField = async () => {
      let roles = await getRolesForSelect();
      for (let field of fieldsFormNewCollaborator) {
        if (field.name === "role") {
          field.component = <DinamicSelect options={roles} />;
        }
      }
      for (let field of fieldsFormCollaborator) {
        if (field.name === "role") {
          field.component = <DinamicSelect options={roles} />;
        }
      }
    };
    setField();
  }, [visible]);

  const onFinish = async (values) => {
    setloading(true);
    let functionEdit = false;
    if (title === "Actualizar ") {
      functionEdit = true;
      for (let field in values) {
        for (let key in data) {
          if (field === key) {
            if (values[field] === data[key]) {
              delete values[field];
            }
          }
        }
      }
    }
    if (values.stores && userInfo.level === "local") {
      if (values.stores.length - data.stores.length > 0) {
        let temp = values.stores.concat(data.onlyLocal);
        values.stores = [...new Set(temp)];
      }
      if (values.stores.length - data.stores.length < 0) {
        let storesForDelete = [];
        if (values.stores.length > 0) {
          data.stores.forEach((store) => {
            let idx = values.stores.indexOf(store);
            if (idx === -1) {
              storesForDelete.push(store);
            }
          });
        } else {
          storesForDelete = data.stores;
        }
        let temp = data.onlyLocal;
        for (let i in storesForDelete) {
          temp = removeElementFromArray(temp, storesForDelete[i], undefined);
        }
        values.stores = [...new Set(temp)];
      }
    }
    if (values.name) {
      values.fullName = values.name;
      delete values.name;
    }
    let token = await getToken();
    let response = functionEdit
      ? await uploadCollaborator(token.token, values, data.id, "collaborators")
      : await setCollaborator(
          token.token,
          values,
          document.domain,
          "collaborators"
        );
    if (response.success) {
      message.success(response.message);
      getData();
    } else {
      message.error(response);
    }
    onCancel();
    setTitle("");
    setvalidatePhone("")
    setdisabled(true);
    setValidateUser("");
    setloading(false);
  };

  const Validate = (field, fields) => {
    if (title === "Actualizar ") {
      let change = [];
      for (let field in fields) {
        for (let key in data) {
          if (field === key) {
            if (fields[field] !== data[key]) {
              change.push(1);
            } else {
              change.push(0);
            }
          }
        }
      }
      setdisabled(true);
      for (let i in change) {
        if (change[i] === 1) {
          setdisabled(false);
        }
      }
    } else {
      setdisabled(false);
    }
    if (field.phone) {
      if (field.phone.length === 8 && stringToNumber(field.phone)) {
        setvalidatePhone("success");
        setdisabled(false)
      } else {
        setvalidatePhone("error");
        setdisabled(true)
      }
    }
    if (field.username) {
      try {
        field.username.match(/([a-z]|[0-9])([@])([a-z])/g)
          ? setValidateUser("success")
          : setValidateUser("error");
      } catch (error) {
        if (validateUser.length > 0) {
          Review("username")
            ? setValidateUser("")
            : setValidateUser(validateUser);
        }
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

  const onFinishFailed = () => {
    message.error("No deje campos vacíos");
  };

  return (
    <Fragment>
      <ModalForm
        name="FormCollaborator"
        title={title + "colaborador"}
        visible={visible}
        onCancel={() => {
          onCancel();
          setdisabled(true);
          setValidateUser("");
          setTitle("");
          setvalidatePhone("")
        }}
        validateStatus={
          title === "Actualizar " ? [0, validatePhone, 0] : [validateUser, validatePhone, 0, 0]
        }
        spinning={loading}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={Validate}
        disabledPrimaryButton={
          title === "Actualizar "
            ? disabled
            : validateUser === "success" && validatePhone === "success"
            ? false
            : true
        }
        fields={
          title === "Actualizar "
            ? fieldsFormCollaborator
            : fieldsFormNewCollaborator
        }
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={form}
      />
    </Fragment>
  );
};

export default TMCollaborator;
