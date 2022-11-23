import React, { useState, useEffect } from "react";
import { ModalInfo } from "../../organisms";
import {
  getAOrder,
  arrayOfDescription,
  arrayOfDescriptionByColumns,
  buildObjOrders,
  getToken,
  changeStateOrder,
} from "../../../hooks";
import { DinamicSelect } from "../../molecules";
import { message } from "../../atoms";
import {
  labelsByOrdersDescriptionsByColumns,
  labelsOfCardsTitles,
} from "../../../consts";

const TMDetailsOrder = (props) => {
  const [info, setInfo] = useState([]);
  const [cards, setCards] = useState([]);
  const [list, setList] = useState({});
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({});

  const getData = async (id) => {
    setloading(true);
    let token = await getToken();
    let response = await getAOrder(token.token, id);
    if (response.success) {
      let data = response.data;
      setdata(data);
      let infoTemp = [];
      let cardsTemp = [];
      for (let item in data) {
        let temp = buildObjOrders(data[item], item, "honduras");
        if (typeof temp !== "boolean") {
          if (typeof data[item] !== "object" || item === "date") {
            infoTemp.push(temp);
          } else {
            if (item === "orderHistory") {
              setList(temp);
            } else {
              cardsTemp.push(temp);
            }
          }
        }
      }
      let descriptions = arrayOfDescriptionByColumns(
        infoTemp,
        labelsByOrdersDescriptionsByColumns
      );
      let cardDescriptions = arrayOfDescription(
        cardsTemp,
        labelsOfCardsTitles
      );
      setInfo(descriptions);
      setCards(cardDescriptions);
    } else {
      message.error(response);
    }
    setloading(false);
  };
  useEffect(() => {
    if (props.id !== "") {
      getData(props.id);
    }
  }, [props.id]);

  const changeStatus = async (value) => {
    setloading(true)
    const date=new Date();
    let options = { year: "numeric", month: "long", day: "numeric"};
    let optionsTime = {hour12:"false"};
    let token = await getToken();
    let response = await changeStateOrder(
      token.token,
      props.id,
      value,
      data.userId,
      {
      date:{
        fullDate: `${date.toLocaleDateString("en-EN", options)} ${date.toLocaleTimeString("es-ES",optionsTime)}`,
        milliseconds: date.valueOf()
      },
      status: value
    }
    );
    if (response.success) {
      message.success(response.message);
      getData(props.id);
      props.getData()
    } else {
      message.error("Error del servidor");
    }
    setloading(false)
  };
  
  return (
    <ModalInfo
      extra={
        <DinamicSelect
          value={data.status}
          options={[
            { value: "proceso", text: "Proceso" },
            { value: "pendiente", text: "Pendiente" },
            { value: "finalizado", text: "Finalizado" },
            { value: "entregado", text: "Entregado" },
          ]}
          onChange={changeStatus}
          style={{ width: 170 }}
          bordered={false}
        />
      }
      title="Orden"
      visible={props.visible}
      onCancel={props.onCancel}
      descriptions={info}
      cards={cards}
      list={list}
      loading={loading}
      visiblePrint={props.visible}
    />
  );
};

export default TMDetailsOrder;
