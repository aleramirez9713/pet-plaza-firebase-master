import React, { useState, useEffect } from "react";
import { ModalForm } from "../../organisms";
import { Map, Form, message } from "../../atoms";
import { fieldsFormEditStore } from "../../../consts";
import {
  arrayHoraries,
  orderArrayWeek,
  getToken,
  updateStore,
} from "../../../hooks";

const TEStore = ({ visible, handleOnCancel, data, id, getData }) => {
  const [positionsCurrent, setpositionsCurrent] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [validatePhone, setvalidatePhone] = useState("success");
  const [msj, setmsj] = useState(false);
  const [polygones, setpolygones] = useState(undefined);
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setvalidatePhone("success");
    setdisabled(false);
    if (data.coordinates) {
      form.setFieldsValue({
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
        city: data.city,
        name: data.name,
        operador: data.operador,
        AB: data.AB,
        BU: data.BU,
        phone: data.phone,
        address: data.address,
        email: data.email,
        activeDelivery: data.activeDelivery,
        activePicknGo: data.activePicknGo,
        zone: data.zone,
      });
      setpositionsCurrent({
        lat: data.coordinates.latitude,
        lng: data.coordinates.longitude,
      });
    }
  }, [form, data, visible]);

  const onDragend = (value) => {
    form.setFieldsValue({
      latitude: value.latitude,
      longitude: value.longitude,
    });
    setpositionsCurrent({
      lat: value.latitude,
      lng: value.longitude,
    });
  };

  const onFinish = async (values) => {
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
    if (
      values.latitude === data.coordinates.latitude ||
      values.longitude === data.coordinates.longitude
    ) {
      delete values.latitude;
      delete values.longitude;
    } else {
      values.coordinates = {
        latitude: values.latitude,
        longitude: values.longitude,
      };
      delete values.latitude;
      delete values.longitude;
    }
    if (!values.horaries) {
      delete values.horaries;
    } else {
      values.horaries = arrayHoraries(values.horaries, 'openingTime', 'closeTime');
      let temp = data.horaries;
      if (temp) {
        values.horaries.forEach((element) => {
          temp = temp.filter((item) => item.day !== element.day);
        });
        values.horaries = values.horaries.concat(temp);
      }
      values.horaries = orderArrayWeek(values.horaries, "day");
    }
    let token = await getToken();
    let response = await updateStore(token.token, values, id);
    if (response.success) {
      message.success(response.message);
    } else {
      message.error("Error: al editar la informacion del local");
    }
    handleOnCancel();
    getData();
    setdisabled(true);
    setvalidatePhone("");
    setmsj(false);
    setpolygones(undefined);
    setloading(false);
  };

  const stringToNumber = (str) => {
    let number = parseInt(str, 10);
    if (number.toString().length === str.length) {
      return number;
    } else {
      return false;
    }
  };

  const Validate = (value, values) => {
    if (value.phone) {
      if (value.phone.length === 8 && stringToNumber(value.phone)) {
        setvalidatePhone("success");
        setdisabled(false);
      } else {
        setvalidatePhone("error");
        setdisabled(true);
      }
    }
  };

  return (
    <ModalForm
      extra={
        <div className="section-extra">
          <span>
            * Mueva el marcador sobre la dirección exacta de la tienda
            {msj ? (
              <span style={{ color: "red" }}>
                * IMPORTANTE: coloque el marcador sobre las zonas sombreadas
              </span>
            ) : null}
          </span>
          <Map
            className="section-extra"
            onDragend={onDragend}
            draggable
            positions={positionsCurrent}
            zoom={18}
            polygones={polygones}
          />
        </div>
      }
      title="Editar tienda"
      visible={visible}
      onCancel={() => {
        handleOnCancel();
        form.resetFields();
        setdisabled(true);
        setvalidatePhone("");
        setmsj(false);
        setpolygones(undefined);
      }}
      spinning={loading}
      validateStatus={[0, 0, 0, validatePhone, 0, 0]}
      onValuesChange={Validate}
      disabledPrimaryButton={disabled}
      onFinishFailed={() => message.error("No deje campos obligatorios vacíos")}
      onFinish={onFinish}
      fields={fieldsFormEditStore}
      primaryButton="Guardar"
      defaultButton="Cancelar"
      form={form}
    />
  );
};

export default TEStore;
