import React, { useState, useEffect } from "react";
import { ModalForm } from "../../organisms";
import { DinamicSelect } from "../../molecules";
import { fieldsFormNewVet, fieldsFormHoraries } from "../../../consts";
import { message, Form, Icon, Input, Button, Select } from "../../atoms";
import {
  setStorage,
  getToken,
  setCollaborator,
  stringToNumber,
  getSpecilities,
  setSpecilities,
  getStoresForSelectVets
} from "../../../hooks";
import "./styles.css";

const Index = ({ visible, onCancel, getData }) => {
  const [validateUser, setValidateUser] = useState("");
  const [loading, setloading] = useState(false);
  const [speciality, setspeciality] = useState([]);
  const [update, setupdate] = useState(false);
  const [validatePhone, setvalidatePhone] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const addSpeciality = async (values) => {
    await setSpecilities(values.addSpeciality);
    setrefresh((prev) => !prev);
    form2.resetFields();
  };

  const getSpecility = async () => {
    setloading(true);
    let res = await getSpecilities();
    setspeciality(res);
    setupdate(true);
  };

  if (update) {
    for (const field of fieldsFormNewVet) {
      if (field.name === "speciality") {
        field.component = (
          <DinamicSelect
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Form
                  className="styles-form-add"
                  onFinish={addSpeciality}
                  form={form2}
                >
                  <Form.Item name="addSpeciality">
                    <Input />
                  </Form.Item>
                  <Button htmlType="submit" type="link">
                    <Icon name="PlusOutlined" /> Agregar
                  </Button>
                </Form>
              </div>
            )}
            options={speciality}
          />
        );
      }
    }
    setupdate(false);
    setloading(false);
  }

  const getClinics = async () => {
    let res = await getStoresForSelectVets();
    for (const f of fieldsFormHoraries[0].fields) {
      if (f.name === "clinic") {
        f.component = (
          <Select options={res} style={{ width: '100%' }} placeholder="Clínica" />
        );
      }
    }
  };

  useEffect(() => {
    if (visible) {
      getSpecility();
      getClinics();
    }
  }, [visible, refresh]);

  const onFinish = async (values) => {
    setloading(true);
    let file = values.upload.originFileObj;
    delete values.upload;
    let taskRef = await setStorage(file, `profile/${values.name}/`);
    if (taskRef.success) {
      let imageRef = taskRef.imageRef[0];
      let downloadURL = imageRef.ref.getDownloadURL();
      values.profile = await downloadURL;
    } else {
      values.profile = "";
    }
    let token = await getToken();
    let response = await setCollaborator(
      token.token,
      values,
      document.domain,
      "vets"
    );
    if (response.success) {
      message.success(response.message);
      getData();
    } else {
      message.error(response);
    }
    onCancel();
    setvalidatePhone("");
    setValidateUser("");
    setloading(false);
    form.resetFields();
  };

  const Validate = (field) => {
    if (field.phone) {
      if (field.phone.length === 8 && stringToNumber(field.phone)) {
        setvalidatePhone("success");
      } else {
        setvalidatePhone("error");
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

  return (
    <ModalForm
      name="FormVets"
      title="Agregar veterinario"
      visible={visible}
      onCancel={() => {
        onCancel();
        setvalidatePhone("");
        setValidateUser("");
        form.resetFields();
      }}
      validateStatus={[validateUser, validatePhone, 0, 0, 0, 0, 0]}
      spinning={loading}
      onFinish={onFinish}
      onFinishFailed={() => message.error("No dejar campos vacíos")}
      onValuesChange={Validate}
      disabledPrimaryButton={
        validateUser === "success" && validatePhone === "success" ? false : true
      }
      fields={[...fieldsFormNewVet, ...fieldsFormHoraries]}
      primaryButton="Guardar"
      defaultButton="Cancelar"
      form={form}
      width={590}
      rulesImage
      image
      layout="vertical"
    />
  );
};

export default Index;
