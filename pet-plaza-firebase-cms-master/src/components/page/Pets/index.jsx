import React, { useEffect, useState } from "react";
import {
  columnsTablePets,
  formatDate,
  columnsExelListPets,
} from "../../../consts";
import { Search, DownLoadButton, Avatar } from "../../molecules";
import { ContentTable } from "../../organisms";
import Apointments from "../Apointments";
import {
  getPetsByBlock,
  getPetsList,
  exportExcel,
  getToken,
  getCodeWithDate,
} from "../../../hooks";
import { message, Modal, Button, Space } from "../../atoms";
import { TMVaccines } from "../../templates";

const Pets = () => {
  const [data, setdata] = useState({
    data: [],
    lastLoadLength: 0,
  });
  const [loading, setloading] = useState(false);
  const [lastRecord, setlastRecord] = useState("");
  const [search, setsearch] = useState("");
  const [loadingDownload, setloadingDownload] = useState(false);
  const [update, setupdate] = useState(true);
  const [build, setbuild] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visibleVaccines, setvisibleVaccines] = useState(false);
  const [petId, setpetId] = useState(null);
  const [petName, setpetName] = useState('');

  if (build) {
    let temp = [];
    data.data.forEach((doc) => {
      temp.push({
        ...doc,
        action: (
          <Space>
            <Button type="primary" onClick={() => getApointment(doc.id)}>
              Citas
            </Button>
            <Button onClick={() => getNamePet(doc.id)}>Vacunas</Button>
          </Space>
        ),
      });
      setlastRecord(doc.birthday);
    });
    setbuild(false);
    setdata((state) => ({
      ...state,
      data: temp,
    }));
    setloading(false);
  }

  const getNamePet=(id)=>{
    let pet = data.data.filter(e=>e.id===id)[0];
    setpetName(pet.name);
    setpetId(id);
    setvisibleVaccines(true);
  }

  const getData = async (lastRecord, search, consultType) => {
    setloading(!consultType);
    setupdate(false);
    let response = await getPetsByBlock(lastRecord, search);
    if (response.success) {
      let temp = [];
      response.data.forEach((doc) => {
        temp.push({
          ...doc,
          key: doc.id,
          birthday: formatDate(doc.birthday),
          image: <Avatar style size={64} src={doc.photo} />,
        });
      });
      setdata((prevState) => ({
        data: !consultType ? temp : prevState.data.concat(temp),
        lastLoadLength: response.data.length,
      }));
    } else {
      message.error("Error del servidor.");
    }
    setbuild(true);
  };

  useEffect(() => {
    if (update) {
      getData(false, false, false);
    }
  }, [update]);

  const onChange = (e) => {
    let str = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();
    str = str.replace(/ /g, "");
    setsearch(str);
    getData(false, str, false);
  };

  const getApointment = async (id) => {
    setpetId(id);
    setvisible(true);
  };

  const downloadList = async () => {
    setloadingDownload(true);
    let token = await getToken();
    let response = await getPetsList(token.token);
    if (response.success) {
      let temp = [];
      const d = new Date();
      response.data.forEach((doc) => {
        d.setTime(doc.birthday);
        temp.push({
          name: doc.name,
          owner: doc.owner,
          birthday: d.toLocaleDateString(),
          species: doc.species,
          breed: doc.breed,
        });
      });
      exportExcel(temp, columnsExelListPets, `Mascotas-${getCodeWithDate()}`);
    } else {
      message.error("Error del servidor");
    }
    setloadingDownload(false);
  };

  return (
    <>
      <ContentTable
        loadMore={() => getData(lastRecord, search, true)}
        hasMore={data.lastLoadLength === 10}
        search={<Search onChange={onChange} />}
        Affix={
          <DownLoadButton
            text="Descargar Lista"
            onClick={downloadList}
            loading={loadingDownload}
          />
        }
        loading={loading}
        columns={columnsTablePets}
        data={data.data}
      />
      <TMVaccines
        visible={visibleVaccines}
        onCancel={()=>setvisibleVaccines(false)}
        petName={petName}
        petId={petId}
        setvisible={(e)=>setvisibleVaccines(e)}
      />
      <Modal
        title="Citas"
        visible={visible}
        onCancel={() => {
          setvisible(false);
          setpetId(null);
        }}
        width={1200}
        footer={null}
      >
        <Apointments petId={petId} />
      </Modal>
    </>
  );
};

export default Pets;
