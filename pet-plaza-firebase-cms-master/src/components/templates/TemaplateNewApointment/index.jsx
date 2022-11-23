import React, { useState, useEffect } from "react";
import { ModalForm } from "../../organisms";
import {
  fieldsFormNewApointmentsUserExist,
  formatDate,
  fieldsFormNewApointmentsUserNoExist,
} from "../../../consts";
import { Select, DatePicker, message, Form, Radio } from "../../atoms";
import {
  getVets,
  getPetsByUser,
  getTypesAppointments,
  freeDays,
  generateQuotas,
  getToken,
  Hours,
  makeApointment,
} from "../../../hooks";
import { useUser } from "../../../Context";

const timeByQuota = (numPets) => {
  let quota = 0.5;
  for (let i = 0; i < numPets; i++) {
    if ((i - 1) % 2 === 0) {
      quota += 0.5;
    }
  }
  return quota;
};

const TNApointment = ({ visible, onCancel, getData, setVets }) => {
  const [form] = Form.useForm();
  const { usersPlataform } = useUser();
  const [formtype, setformtype] = useState(1);
  const [users, setusers] = useState([]);
  const [vets, setvets] = useState([]);
  const [vetSelected, setvetSelected] = useState();
  const [dateSelected, setdateSelected] = useState();
  const [hours, sethours] = useState([]);
  const [, setstate] = useState(false);
  const [pets, setpets] = useState([]);
  const [petsSelected, setpetsSelected] = useState([]);
  const [typesApointments, settypesApointments] = useState([]);
  const [disabled, setdisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const build = (
    array,
    users,
    vets,
    pets,
    hours,
    typesApointments,
    vetSelected,
    formtype
  ) => {
    for (const field of array) {
      switch (true) {
        case field.name === "user" && formtype === 1:
          field.component = (
            <Select
              showSearch
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={users}
              style={{ width: 180 }}
              placeholder="Usuarios"
            />
          );
          break;
        case field.name === "vet":
          field.component = (
            <Select
              options={vets}
              style={{ width: 180 }}
              placeholder="Veterinarios"
            />
          );
          break;
        case field.name === "date":
          field.component = (
            <DatePicker
              disabledDate={(date) => {
                const d = new Date();
                if (
                  formatDate(date.valueOf()) === formatDate(d.getTime()) ||
                  date.valueOf() > d.getTime()
                ) {
                  let days = freeDays(vetSelected, date);
                  return typeof days === "boolean" ? days : days.length === 0;
                } else {
                  return true;
                }
              }}
            />
          );
          break;
        case field.name === "hour":
          field.component = (
            <Select
              options={hours}
              style={{ width: 180 }}
              placeholder="Cupos"
            />
          );
          break;
        case field.name === "pets":
          field.fields.forEach((item) => {
            switch (item.name) {
              case "petId":
                item.component = (
                  <Select
                    options={pets}
                    style={{ width: '100%' }}
                    placeholder="Mascotas"
                  />
                );
                break;
              case "type":
                item.component = (
                  <Select
                    options={typesApointments}
                    style={{ width: '100%' }}
                    placeholder="Tipos de cita"
                  />
                );
                break;
              default:
                break;
            }
          });
          break;
        default:
          break;
      }
    }
    setstate((state) => !state);
  };

  const getUsersAndVets = async (users, setVets) => {
    setisLoading(true);
    let tempUsers = [];
    let tempVets = [];
    let vets = await getVets();
    vets.data.forEach((doc) => {
      tempVets.push({
        label: doc.fullName,
        value: JSON.stringify(doc),
      });
    });
    users.forEach((doc) => {
      tempUsers.push({
        label: doc.fullName,
        value: JSON.stringify(doc),
      });
    });
    setVets(tempVets)
    setusers(tempUsers);
    setvets(tempVets);
  };
  const getTypesAppointment = async () => {
    let temp = [];
    let types = await getTypesAppointments();
    types.types.forEach((doc) => {
      temp.push({
        label: doc.type,
        value: JSON.stringify(doc),
      });
    });
    settypesApointments(temp);
  };

  useEffect(() => {
    getUsersAndVets(usersPlataform, setVets);
    getTypesAppointment();
    setisLoading(false);
  }, [usersPlataform, setVets]);

  useEffect(() => {
    build(
      formtype === 1
        ? fieldsFormNewApointmentsUserExist
        : fieldsFormNewApointmentsUserNoExist,
      users,
      vets,
      pets,
      hours,
      typesApointments,
      vetSelected,
      formtype
    );
  }, [users, vets, pets, hours, typesApointments, vetSelected, formtype]);

  const Validate = async (value, values) => {
    if (value.user && formtype === 1) {
      setisLoading(true);
      let temp = [];
      let pets = await getPetsByUser(JSON.parse(value.user).id);
      pets.data.forEach((doc) => {
        temp.push({
          label: doc.name,
          value: JSON.stringify(doc),
        });
      });
      setpets(temp);
      setisLoading(false);
    }
    if (value.pets) {
      let temp = [];
      if (formtype === 1) {
        for (const i in values.pets) {
          if (values.pets[i]) {
            if (values.pets[i].petId && values.pets[i].type) {
              temp[i] = values.pets[i].petId;
            }
          }
        }
      } else {
        for (const i in values.pets) {
          if (values.pets[i]) {
            if (
              values.pets[i].birthday &&
              values.pets[i].gender &&
              values.pets[i].breed &&
              values.pets[i].species &&
              values.pets[i].name &&
              values.pets[i].type
            ) {
              temp[i] = values.pets[i].petId;
            }
          }
        }
      }
      if (petsSelected.length !== temp.length ) {
        setpetsSelected(temp);
      }
    }
    if (values.pets) {
      if (formtype === 1) {
        setdisabled(
          values.pets.length === 0
            ? true
            : values.pets[0]
            ? values.pets[0].petId && values.pets[0].type
              ? false
              : true
            : true
        );
      } else {
        setdisabled(
          values.pets.length === 0
            ? true
            : values.pets[0]
            ? values.pets[0].name && values.pets[0].type
              ? false
              : true
            : true
        );
      }
    }
    if (value.vet) {
      setvetSelected(JSON.parse(value.vet));
    }
    if (value.date) {
      let date = value.date.format("YYYY-MM-DD");
      setdateSelected(date);
    }
  };

  useEffect(() => {
    setisLoading(true);
    setpets((state) => {
      let temp = state;
      for (const j in temp) {
        if (petsSelected.indexOf(temp[j].value) > -1) {
          temp[j] = {
            ...temp[j],
            disabled: true,
          };
        } else {
          temp[j] = {
            ...temp[j],
            disabled: false,
          };
        }
      }
      return temp;
    });
    setisLoading(false);
  }, [petsSelected]);

  useEffect(() => {
    if (petsSelected && dateSelected && vetSelected) {
      form.setFieldsValue({
        hour: undefined
      })
      getQuotas(petsSelected.length, dateSelected, vetSelected.id);
    }
  }, [petsSelected, dateSelected, vetSelected, form]);

  const getQuotas = async (pets, date, vetId) => {
    setisLoading(true);
    let token = await getToken();
    let quotas = await generateQuotas(token.token, vetId, date, pets);
    if (quotas.success) {
      let temp = [];
      quotas.data.forEach((doc) => {
        let label = `${Hours[doc[0]]}:${doc[1] === 30 ? doc[1] : "00"} ${
          doc[0] > 12 ? "PM" : "AM"
        }`;
        let value = `${doc[0]}:${doc[1] === 30 ? doc[1] : "00"}`;
        temp.push({ label, value });
      });
      sethours(temp);
    } else {
      message.error("Error:", "error al obtener los cupos");
    }
    setisLoading(false);
  };

  const onFinish = async (values) => {
    setisLoading(true);
    const d = new Date();
    values.date = values.date.format("M/D/YYYY");
    values.status = "pendiente";
    values.time = timeByQuota(values.pets.length);
    values.vetId = JSON.parse(values.vet).id;
    delete values.vet;
    values.createDate = d.getTime();
    if (formtype === 1) {
      values.user = {
        id: JSON.parse(values.user).id,
        name: JSON.parse(values.user).fullName,
        phone: JSON.parse(values.user).phone,
      };
      let temp = [];
      for (const item of values.pets) {
        let pet = JSON.parse(item.petId);
        let type = JSON.parse(item.type);
        temp.push({
          petId: pet.id,
          name: pet.name,
          type: type.type,
          description: type.description,
        });
      }
      values.pets = temp;
    } else {
      values.user = {
        name: values.user,
        phone: values.phone,
      };
      delete values.phone;
      let temp = [];
      for (const item of values.pets) {
        let type = JSON.parse(item.type);
        temp.push({
          ...item,
          birthday: item.birthday.valueOf(),
          type: type.type,
          description: type.description,
        });
      }
      values.pets = temp;
    }
    let token = await getToken();
    let response = await makeApointment(token.token, values);
    if (response.success) {
      message.success(response.message);
      getData();
      cancel();
    } else {
      message.error("Error: no se pudo crear la cita");
    }
    setisLoading(false);
  };

  const cancel = () => {
    onCancel();
    form.resetFields();
    setdateSelected();
    setvetSelected();
    sethours([]);
    setpets([]);
    setpetsSelected([]);
    setdisabled(true);
  };

  return (
    <ModalForm
      extra={
        <Radio.Group
          name="radiogroup"
          defaultValue={formtype}
          onChange={(e) => setformtype(e.target.value)}
        >
          <Radio value={1}>Usuario Registrado</Radio>
          <Radio value={2}>Usuario No Registrado</Radio>
        </Radio.Group>
      }
      title="Nueva cita"
      visible={visible}
      onCancel={cancel}
      spinning={isLoading}
      onValuesChange={Validate}
      validateStatus={[0, 0, 0, 0, 0, 0]}
      disabledPrimaryButton={disabled}
      onFinish={onFinish}
      onFinishFailed={() => message.error("No dejar campos vacíos")}
      fields={
        formtype === 1
          ? fieldsFormNewApointmentsUserExist
          : fieldsFormNewApointmentsUserNoExist
      }
      form={form}
      primaryButton="Crear"
      defaultButton="Cancelar"
      layout="vertical"
      extraStyle2
    />
  );
};

export default TNApointment;
