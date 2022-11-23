import React, { useState, useEffect, Fragment } from "react";
import { ContentTable } from "../../organisms";
import {
  getToken,
  uploadCollaborator,
  handleOnSearch,
  getVets,
  exportExcel,
} from "../../../hooks";
import { message, Button, Switch, confirm, Icon, Space } from "../../atoms";
import { TMVets, TMDetails, TMSpecialities } from "../../templates";
import { Search, ButtonAdd, DownLoadButton } from "../../molecules";
import {
  columnsTableVets,
  filtersOfVets,
  columnsExelListVets,
} from "../../../consts";
import "./style.css";

const Index = () => {
  const [data, setdata] = useState([]);
  const [vet, setvet] = useState({ info: [] });
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(false);
  const [buildData, setbuildData] = useState(true);
  const [search, setsearch] = useState("");
  const [visible, setvisible] = useState(false);
  const [visibleSpecialities, setvisibleSpecialities] = useState(false);
  const [visibleProfile, setvisibleProfile] = useState(false);

  const getData = async () => {
    setloading(true);
    let response = await getVets();
    if (response.success) {
      let temp = [];
      response.data.forEach((doc) => {
        temp.push({
          ...doc,
          image: doc.profile,
        });
      });
      setdata(temp);
    } else {
      message.error(response.error);
    }
    setbuildData(true);
    setloading(false);
  };

  const updateEnable = (id, value) => {
    let user = data.filter((doc) => doc.id === id);
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: !value
        ? `Desea bloquear el usuario ${user[0].name}`
        : `Desea desbloquear el usuario ${user[0].name}`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let token = await getToken();
        let response = await uploadCollaborator(
          token.token,
          { enable: value },
          id,
          "vets"
        );
        if (response.success) {
          message.success(response.message);
        } else {
          message.error("Error en el Servidor");
        }
        getData();
      },
      onCancel() {},
    });
  };

  const showProfile = (id) => {
    let item = data.filter((vet) => vet.id === id)[0];
    let info = [];
    for (let i in item) {
      info.push({ field: i, value: item[i] });
    }
    setvet({ ...item, info });
    setvisibleProfile(true);
  };

  if (buildData) {
    let temp = [];
    data.forEach((element) => {
      temp.push({
        ...element,
        key: element.id,
        enable: (
          <Switch
            checked={element.enable}
            onChange={(value) => updateEnable(element.id, value)}
          />
        ),
        actions: (
          <Button type="link" onClick={() => showProfile(element.id)}>
            Ver Perfil
          </Button>
        ),
      });
    });
    setdataSource(temp);
    setbuildData(false);
    setloading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const downloadList = () => {
    let temp = [];
    for (let doc of data) {
      let list = "";
      if (doc.horaries) {
        for (let day of doc.horaries) {
          list += `${day.day}: ${day.entryTime} - ${day.departureTime} \n`;
        }
      } else {
        list = "No definido";
      }
      temp.push({
        name: doc.name,
        email: doc.email,
        clinic: doc.clinic,
        speciality: doc.speciality,
        faculty: doc.faculty,
        horaries: list,
      });
    }
    const d = new Date();
    exportExcel(
      temp,
      columnsExelListVets,
      `Lista de Veterinarios-${d.toLocaleDateString()}-${d.getTime()}`
    );
  };

  return (
    <Fragment>
      <ContentTable
        search={
          <Space className="haed-search-and-download">
            <Search onChange={(e) => setsearch(e.target.value)} />
            <DownLoadButton
              round
              text="Descargar Lista"
              onClick={downloadList}
            />
          </Space>
        }
        Affix={
          <Space className="haed-search-and-download">
            <Button
              icon={<Icon name="EditOutlined" />}
              onClick={() => setvisibleSpecialities(true)}
            >
              Especialidades
            </Button>
            <ButtonAdd
              onClick={() => setvisible(true)}
              text="Agregar veterinario"
            />
          </Space>
        }
        loading={loading}
        columns={columnsTableVets}
        data={handleOnSearch([search], dataSource, filtersOfVets)}
      />
      <TMVets
        visible={visible}
        onCancel={() => setvisible(false)}
        getData={getData}
      />
      <TMDetails
        title="Perfil del Veterinario"
        visible={visibleProfile}
        onCancel={() => setvisibleProfile(false)}
        getData={getData}
        width={800}
        data={vet}
      />
      <TMSpecialities
        visible={visibleSpecialities}
        onCancel={() => setvisibleSpecialities(false)}
        vets={data}
      />
    </Fragment>
  );
};

export default Index;
