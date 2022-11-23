import React, { useState, useEffect, Fragment } from "react";
import { ContentTable } from "../../organisms";
import { ButtonAdd, Search, DownLoadButton } from "../../molecules";
import {
  message,
  Button,
  Space,
  Form,
  Popover,
  Icon,
  DatePicker,
  Select,
} from "../../atoms";
import {
  columnsTableAppointments,
  columnsExelApointments,
} from "../../../consts";
import { TNApointment, TDApointments } from "../../templates";
import { getAppointments, hoursString, exportExcel } from "../../../hooks";

const Apointments = ({ petId, vetId }) => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visibleDetails, setvisibleDetails] = useState(false);
  const [updateData, setupdateData] = useState(true);
  const [apointment, setapointment] = useState({});
  const [vets, setvets] = useState([]);
  const [lastRecord, setlastRecord] = useState();
  const [filters, setfilters] = useState({
    search: undefined,
    date: undefined,
    vet: undefined,
  });
  const [data, setdata] = useState({
    lastLoadLength: 0,
    apointments: [],
  });

  const getData = async (typeRequest, lastRecord, search, date, vet, petId, vets) => {
    setupdateData(false);
    setloading(!typeRequest);
    let response = await getAppointments(lastRecord, search, date, vet, petId);
    if (response.success) {
      let temp = [];
      response.data.forEach((doc) => {
        const d = new Date(doc.date);
        temp.push({
          ...doc,
          key: doc.id,
          name: doc.user.name,
          phone: doc.user.phone,
          tags: doc.createDate,
          hour: hoursString(doc.hour),
          dateA: d.toLocaleDateString(),
          time: `${60 * doc.time} min.`,
          action: (
            <Button
              type="link"
              onClick={() => {
                setvisibleDetails(true);
                setapointment(doc);
              }}
            >
              Detalles
            </Button>
          ),
        });
        setlastRecord(doc.createDate);
      });
      setdata((state) => ({
        lastLoadLength: response.data.length,
        apointments: typeRequest ? state.apointments.concat(temp) : temp,
      }));
    } else {
      message.error("Error en obtener los datos.");
    }
    setloading(false);
  };

  useEffect(() => {
    if (updateData) {
      getData(
        false,
        lastRecord,
        filters.search,
        filters.date,
        filters.vet,
        petId,
        vets
      );
    }
  }, [filters, petId, vetId, updateData, lastRecord, vets]);

  const onChange = (e) => {
    let str = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();
    str = str.replace(/ /g, "");
    setfilters((state) => ({
      ...state,
      search: str === "" ? undefined : str,
    }));
  };

  const validate = (value) => {
    let temp = {};
    if (value.date) {
      temp.date = value.date.format("M/D/YYYY");
    }
    if (value.vet) {
      let vet = JSON.parse(value.vet);
      temp.vet = vet.id;
    }
    setfilters((state) => ({
      ...state,
      ...temp,
    }));
  };

  const clear = () => {
    setfilters((state) => ({
      ...state,
      date: undefined,
      vet: undefined,
    }));
    form.resetFields();
  };

  const filtersContent = (
    <Form form={form} layout="vertical" onValuesChange={validate}>
      <Form.Item label="Fecha:" name="date">
        <DatePicker placeholder="Seleccione una fecha" format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item label="Veterinarios:" name="vet">
        <Select placeholder="Seleccione un veterinario" options={vets} />
      </Form.Item>
      <Button type="primary" onClick={clear}>
        Limpiar
      </Button>
    </Form>
  );

  const update = () => {
    let temp = data.apointments.filter((e) => e.id === apointment.id);
    if (temp.length > 0) {
      setapointment(temp[0]);
    }
    getData(false, filters.search, filters.date, filters.vet);
  };

  const DownloadReport = () => {
    const d = new Date();
    let temp = [];
    for (const item of data.apointments) {
      let apointment = {};
      for (const key in item) {
        for (const colum of columnsExelApointments) {
          if (colum.key === "vet") {
            let vet = vets.filter(
              (e) => JSON.parse(e.value).id === item.vetId
            )[0];
            apointment.vet = vet.label;
          }
          if (colum.key === key) {
            if (colum.key === "pets") {
              apointment[key] = item[key].length;
            } else {
              apointment[key] = item[key];
            }
          }
        }
      }
      temp.push(apointment);
    }
    exportExcel(
      temp,
      columnsExelApointments,
      `Reporte del ${d.toLocaleDateString()}`
    );
  };

  return (
    <Fragment>
      <ContentTable
        loadMore={() =>
          getData(true, filters.search, filters.date, filters.vet)
        }
        hasMore={data.lastLoadLength === 10}
        search={
          <Space>
            <Search onChange={onChange} />
            <Popover
              placement="bottom"
              content={filtersContent}
              title="Filtros"
              trigger="click"
            >
              <Button icon={<Icon name="ControlOutlined" />} />
            </Popover>
            <Button
              icon={<Icon name="ReloadOutlined" />}
              onClick={() => getData(false)}
            />
          </Space>
        }
        Affix={
          <Space>
            <DownLoadButton
              round
              text="Reporte de citas"
              type="default"
              onClick={DownloadReport}
            />
            <ButtonAdd text="Nueva cita" onClick={() => setvisible(true)} />
          </Space>
        }
        loading={loading}
        columns={columnsTableAppointments}
        data={data.apointments}
      />
      <TNApointment
        visible={visible}
        onCancel={() => setvisible(false)}
        getData={() => getData(false)}
        setVets={setvets}
      />
      <TDApointments
        visible={visibleDetails}
        Cancel={() => setvisibleDetails(false)}
        title="Detalles de cita"
        data={apointment}
        width={800}
        getData={update}
        vet={vets.filter((e) => JSON.parse(e.value).id === apointment.vetId)}
      />
    </Fragment>
  );
};

export default Apointments;
