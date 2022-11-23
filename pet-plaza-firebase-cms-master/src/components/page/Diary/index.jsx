import React, { useState, useEffect } from "react";
import { Calendar, message, Space, Spin } from "../../atoms";
import { useUser } from "../../../Context";
import { freeDays, getappointmentsByVet } from "../../../hooks";
import { TMDiary } from "../../templates";
import "./styles.css";
import { Button } from "antd";

const Diary = () => {
  const [appointments, setappointments] = useState([]);
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [dateSelected, setdateSelected] = useState(undefined);
  const { userInfo } = useUser();

  const getData = async (uid) => {
    setloading(true);
    let res = await getappointmentsByVet(uid);
    if (res.success) {
      setappointments(res.data);
    } else {
      message.error("Error en el servidor");
    }
    setloading(false);
  };

  useEffect(() => {
    getData(userInfo.id);
  }, [userInfo]);

  const getListData = (value) => {
    let day = freeDays(userInfo, value);
    if (day.length === 0) {
      return [{ type: "warning", content: "" }];
    } else {
      let num = appointments.filter((e) => value.format("M/D/YYYY") === e.date);
      return [
        {
          type: "success",
          content: (
            <Space direction="vertical">
              <Button type="link" onClick={() => viewModal(value)}>
                {`${num.length} Cita(s)`}
              </Button>
            </Space>
          ),
        },
      ];
    }
  };

  const disabledDate = (date) => {
    let day = freeDays(userInfo, date);
    return day.length === 0;
  };

  const viewModal = (e) => {
    setdateSelected(e.format("M/D/YYYY"));
    setvisible(true);
  };

  const onCancel = () => {
    setvisible(false);
  };

  return (
    <div className="calendar-content">
      <Spin spinning={loading}>
        <Calendar
          getListData={getListData}
          disabledDate={disabledDate}
          mode="month"
        />
      </Spin>
      <TMDiary
        visible={visible}
        date={dateSelected}
        onCancel={onCancel}
        vet={userInfo.id}
      />
    </div>
  );
};

export default Diary;
