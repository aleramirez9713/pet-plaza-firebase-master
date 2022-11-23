import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Descriptions,
  Spin,
  message,
  Form,
  Select,
} from "../../atoms";
import { Avatar, ButtonEdit, Forms } from "../../molecules";
import {
  fieldsFormHoraries,
  fieldsFormEditVet,
  labelsOfProfileVets,
} from "../../../consts";
import {
  arrayHoraries,
  orderArrayWeek,
  uploadCollaborator,
  getToken,
  removeStorage,
  setStorage,
  stringToNumber,
  getStoresForSelectVets,
  getSpecilities
} from "../../../hooks";
import "./style.css";

const TMDetails = ({ title, visible, onCancel, width, data, getData }) => {
  const [buttonSave, setbuttonSave] = useState(false);
  const [loading, setloading] = useState(false);
  const [edit, setedit] = useState(false);
  const [validatePhone, setvalidatePhone] = useState("");
  const [form] = Form.useForm();
  const form2 = Form.useForm()[0];

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

  const getSpecility = async () => {
    let res = await getSpecilities();
    for (const f of fieldsFormEditVet) {
      if (f.name === "speciality") {
        f.component = (
          <Select options={res} style={{ width: 150 }} placeholder="Especialidad" />
        );
      }
    }
  };

  useEffect(() => {
    if (visible) {
      getSpecility();
      getClinics();
    }
  }, [visible]);

  const Validate = (value, values) => {
    if (values.phone) {
      if (values.phone.length === 8 && stringToNumber(values.phone)) {
        setvalidatePhone("success");
      } else {
        setvalidatePhone("error");
      }
    }
    if (value.horaries) {
      if (value.horaries.length > 0) {
        setbuttonSave(true);
      } else {
        setbuttonSave(false);
      }
    }
  };

  const onFinish = async (values) => {
    setloading(true);
    values.horaries = arrayHoraries(
      values.horaries,
      "entryTime",
      "departureTime"
    );
    let temp = data.horaries;
    if (temp) {
      values.horaries.forEach((element) => {
        temp = temp.filter((item) => item.day !== element.day);
      });
      values.horaries = values.horaries.concat(temp);
    }
    values.horaries = orderArrayWeek(values.horaries, "day");
    for (const e of values.horaries) {
      try {
        if (typeof e.clinic === "string") {
          e.clinic = JSON.parse(e.clinic);
        }
      } catch (error) {}
    }
    let token = await getToken();
    let response = await uploadCollaborator(
      token.token,
      values,
      data.id,
      "vets"
    );
    if (response.success) {
      message.success(response.message);
      getData();
      Cancel();
    } else {
      message.error(response);
    }
    setbuttonSave(false);
    setloading(false);
  };

  const update = async (values) => {
    setloading(true);
    for (let field in values) {
      for (let key in data) {
        if (field === key) {
          if (values[field] === data[key]) {
            delete values[field];
          }
        }
      }
    }
    if (values.upload) {
      if (data.image) {
        await removeStorage(data.image);
      }
      let file = values.upload.originFileObj;
      let taskRef = await setStorage(file, `profile/${data.name}/`);
      if (taskRef.success) {
        let imageRef = taskRef.imageRef[0];
        let downloadURL = imageRef.ref.getDownloadURL();
        delete values.upload;
        values.profile = await downloadURL;
      } else {
        values.profile = "";
      }
    } else {
      delete values.upload;
    }
    if (values.name) {
      values.fullName = values.name;
      delete values.name;
    }
    if (Object.keys(values).length > 0) {
      let token = await getToken();
      let response = await uploadCollaborator(
        token.token,
        values,
        data.id,
        "vets"
      );
      if (response.success) {
        message.success(response.message);
        getData();
        Cancel();
      } else {
        message.error(response);
      }
    }
    setloading(false);
  };

  const Cancel = () => {
    onCancel();
    setedit(false);
    form.resetFields();
    form2.resetFields();
    setvalidatePhone("");
  };

  const openEdit = () => {
    form2.setFieldsValue(data);
    setedit(true);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={Cancel}
      width={edit ? 590 : width}
      footer={null}
    >
      <Spin spinning={loading}>
        {edit ? (
          <Col span={24}>
            <Forms
              name="FormVets-edit"
              onCancel={() => {
                setedit(false);
                form2.resetFields();
                setvalidatePhone("");
              }}
              validateStatus={[0, validatePhone, 0, 0, 0]}
              onValuesChange={Validate}
              onFinish={update}
              onFinishFailed={() => message.error("No dejar campos vacíos")}
              disabledPrimaryButton={validatePhone !== "success"}
              fields={fieldsFormEditVet}
              primaryButton="Guardar"
              defaultButton="Cancelar"
              form={form2}
              image
            />
          </Col>
        ) : (
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="image-data">
              <Avatar size={256}  style src={data.image} />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ padding: 20, paddingTop: 5 }}
            >
              <div className="button-update">
                <ButtonEdit onClick={openEdit} />
              </div>
              <Descriptions
                title="Datos generales"
                column={2}
                layout="vertical"
              >
                {labelsOfProfileVets.map((item) =>
                  data.info.map((field) =>
                    field.field === item.field ? (
                      <Descriptions.Item
                        key={field.field}
                        label={<b>{item.label}</b>}
                      >
                        {field.value}
                      </Descriptions.Item>
                    ) : null
                  )
                )}
              </Descriptions>
            </Col>
            <Col span={24} className="description-horaries">
              {data.horaries ? (
                <Descriptions title="Horario" layout="vertical">
                  {data.horaries.map((day) => (
                    <Descriptions.Item key={day.day} label={day.day}>
                      {`${day.entryTime} - ${day.departureTime}`}
                      <p>{day.clinic.name}</p>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              ) : null}
            </Col>
            <Col span={24} className="horaries-vet">
              <Forms
                form={form}
                name="horaries-vets"
                onValuesChange={Validate}
                validateStatus={[0]}
                onCancel={onCancel}
                onFinish={onFinish}
                fields={fieldsFormHoraries}
                primaryButton={!buttonSave ? undefined : "Guardar"}
                layout="vertical"
              />
            </Col>
          </Row>
        )}
      </Spin>
    </Modal>
  );
};

export default TMDetails;
