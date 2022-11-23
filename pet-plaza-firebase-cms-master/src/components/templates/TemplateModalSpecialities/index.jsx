import React, { useState, useEffect } from "react";
import { Input, Icon, message } from "../../atoms";
import { ModalTable } from "../../organisms";
import { columnsTableSpecialities } from "../../../consts";
import { getSpecilities, setSpecilities, deleteSpecilities } from "../../../hooks";

const { Search } = Input;

const TMSpecialities = ({ visible, onCancel, vets }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [specialitySelected, setspecialitySelected] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setspecialitySelected(selectedRowKeys);
    },
    selectedRowKeys: specialitySelected,
  };

  const getData = async (vets) => {
    setloading(true);
    let response = await getSpecilities();
    let temp = [];
    response.forEach((doc, i) => {
      let lengthVets = vets.filter((item) => item.speciality === doc.value);
      temp.push({
        ...doc,
        key: doc.id,
        lengthVets: lengthVets.length,
      });
    });
    setdata(temp);
    setloading(false);
  };

  useEffect(() => {
    getData(vets);
  }, [visible, vets]);

  const addNewSpeciality = async (speciality) => {
    if (speciality.length > 0) {
      setloading(true);
      let res = await setSpecilities(speciality);
      if (res) {
          message.success("Especialidad agregada exitosamente")
          getData(vets);
      }else{
          message.error("Error al agregar la espscialidad, intente nuevamente.")
      }
      setloading(false);
    }
  };

  const removeSpecialities = async () => {
    setloading(true)
    let res = await deleteSpecilities(specialitySelected)
    if (res) {
        message.success("Especialidades eliminadas exitosamente")
        getData(vets);
    }else{
        message.error("Error al eliminar las espscialidades, intente nuevamente.")
    }
    setloading(false)
  }

  return (
    <ModalTable
      title="Especialidades"
      visible={visible}
      onCancel={() => {
        onCancel();
        setspecialitySelected([]);
      }}
      width={550}
      extra={
        <Search
          placeholder="Agregar Especialidad"
          style={{ width: 250 }}
          allowClear
          enterButton={<Icon name="PlusOutlined" />}
          onSearch={addNewSpeciality}
        />
      }
      hiddenSearch
      loading={loading}
      rowSelection={{ ...rowSelection }}
      columns={columnsTableSpecialities}
      dataSource={data}
      onClick={removeSpecialities}
      danger
      textButton="Eliminar Especialidades"
    />
  );
};

export default TMSpecialities;
