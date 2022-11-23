import React, { Fragment, useState, useEffect } from "react";
import { ButtonAdd } from "../../molecules";
import { ModalForm } from "../../organisms";
import { message, Map } from "../../atoms";
import { fieldsFormNewStore } from "../../../consts";
import {
  arrayHoraries,
  setStore,
  getToken,
  orderArrayWeek,
} from "../../../hooks";
import { useCurrentPosition } from "react-use-geolocation";
import "./style.css";

const TNStore = ({ visible, onClick, handleOnCancel, form, getData }) => {
  const [loading, setloading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [position] = useCurrentPosition();
  const [positionsCurrent, setpositionsCurrent] = useState({});
  const [validatePhone, setvalidatePhone] = useState("");
  const [polygones, setpolygones] = useState(undefined);
  const [msj, setmsj] = useState(false);

  useEffect(() => {
    if (position && Object.entries(positionsCurrent).length === 0) {
      setpositionsCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  }, [position, positionsCurrent]);

  const onFinish = async (values) => {
    setloading(true);
    values.coordinates = {
      latitude: values.latitude,
      longitude: values.longitude,
    };
      values.horaries = arrayHoraries(values.horaries, 'openingTime', 'closeTime');
    values.horaries = orderArrayWeek(values.horaries, "day");
    delete values.latitude;
    delete values.longitude;
    let token = await getToken();
    let response = await setStore(token.token, values);
    if (response.success) {
      message.success(response.message);
    } else {
      message.error("Error al crear el local");
    }
    handleOnCancel();
    getData();
    setdisabled(true);
    if (position && Object.entries(positionsCurrent).length === 0) {
      setpositionsCurrent({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
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
    if (values.horaries && values.phone) {
      if (
        values.horaries.length > 0 &&
        values.phone.length === 8 &&
        stringToNumber(values.phone)
      ) {
        setdisabled(false);
      } else {
        setdisabled(true);
      }
    }
    if (values.phone) {
      if (values.phone.length === 8 && stringToNumber(values.phone)) {
        setvalidatePhone("success");
      } else {
        setvalidatePhone("error");
      }
    }
  };

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

  return (
    <Fragment>
      <ButtonAdd onClick={onClick} text="Agregar tienda" />
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
            {position ? (
              <Map
                className="section-extra"
                onDragend={onDragend}
                draggable
                positions={positionsCurrent}
                zoom={11.2}
                polygones={polygones}
              />
            ) : (
              <span>Loading...</span>
            )}
          </div>
        }
        title="Nueva tienda"
        visible={visible}
        onCancel={() => {
          handleOnCancel();
          setdisabled(true);
          if (position && Object.entries(positionsCurrent).length === 0) {
            setpositionsCurrent({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
          setvalidatePhone("");
          setmsj(false);
          setpolygones(undefined);
        }}
        spinning={loading}
        validateStatus={[0, 0, 0, validatePhone, 0, 0]}
        onValuesChange={Validate}
        disabledPrimaryButton={disabled}
        onFinishFailed={() => message.error("No dejar campos vacíos")}
        onFinish={onFinish}
        fields={fieldsFormNewStore}
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={form}
      />
    </Fragment>
  );
};

export default TNStore;
