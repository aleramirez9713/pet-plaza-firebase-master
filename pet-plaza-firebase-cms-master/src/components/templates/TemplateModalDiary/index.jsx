import React, { useState, useEffect } from "react";
import { ModalTable } from "../../organisms";
import { columnsTableAppointmentsByDate } from "../../../consts";
import { getappointmentsByVet, hoursString, updateApointment, getToken } from "../../../hooks";
import { Button, message, Space } from "antd";

const TMDiary = ({ date, vet, visible, onCancel }) => {
  const today = new Date();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [update, setupdate] = useState(true);
  const [build, setbuild] = useState(false);

  const updateStatus = async (id, update) => {
    setloading(true);
    let token = await getToken();
    let res = await updateApointment(token.token, id, {status: update});
    if (res.success) {
      setupdate(true);
    } else {
      message.error("no se pudo cambiar el estado");
    }
    setloading(false);
  };

  if (build) {
    let status = {
      atendida: "Atendida",
      cancelada: "Cancelada",
    };
    let temp = [];
    let hourToday = today.toLocaleTimeString().split(":");
    data.forEach((doc) => {
      const d = new Date(doc.date);
      let hour = doc.hour.split(":");
      temp.push({
        ...doc,
        status:
          doc.status === "pendiente" ? (
            <Space>
              <Button
                onClick={() => updateStatus(doc.id, "atendida")}
                disabled={
                  parseInt(hourToday[0]) > parseInt(hour[0])
                    ? true
                    : d.toLocaleDateString() !== today.toLocaleDateString()
                }
                type="primary"
              >
                Atendida
              </Button>
              <Button
                onClick={() => updateStatus(doc.id, "cancelada")}
                type="primary"
                danger
                disabled={
                  d.getTime() < today.getTime()
                    ? false
                    : d.toLocaleDateString() !== today.toLocaleDateString()
                }
              >
                Cancelada
              </Button>
            </Space>
          ) : (
            status[doc.status]
          ),
      });
    });
    setdata(temp);
    setloading(false);
    setbuild(false);
  }

  const getData = async (date, vet) => {
    setloading(true);
    setupdate(false);
    let res = await getappointmentsByVet(vet, date);
    if (res.success) {
      let temp = [];
      for (const doc of res.data) {
        const t = 60 * doc.time;
        const d = new Date(doc.date);
        temp.push({
          ...doc,
          key: doc.id,
          hourA: hoursString(doc.hour),
          dateA: d.toLocaleDateString(),
          userName: doc.user.name,
          time: `${t} min. `,
          petDescrption: doc.pets.map((p) => (
            <div style={{width: 200}} key={p.petId}>
              <b>* {p.name}: </b>
              <span>{p.type}</span>
            </div>
          )),
        });
      }
      setdata(temp);
    } else {
      message.error("Error en el servidor");
    }
    setbuild(true);
  };

  useEffect(() => {
    if (visible && update) {
      getData(date, vet);
    }
  }, [date, vet, visible, update]);

  return (
    <ModalTable
      title={`Citas del ${date}`}
      visible={visible}
      hiddenSearch
      onCancel={() => {
        onCancel();
        setupdate(true);
      }}
      loading={loading}
      columns={columnsTableAppointmentsByDate}
      dataSource={data}
      width={1000}
    />
  );
};

export default TMDiary;
