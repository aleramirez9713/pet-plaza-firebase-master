import React, { useState, useEffect } from "react";
import { ModalTable, ModalForm } from "../../organisms";
import {
  columnsTableHistoryVaccines,
  columnsTableVaccines,
  fieldsFormNewVaccines,
  formatDate,
} from "../../../consts";
import {
  getVaccines,
  addVaccinesPet,
  getToken,
  getVaccinesByPet,
  appliedVaccineToPet,
} from "../../../hooks";
import { Button, Icon, Form, message, Select } from "../../atoms";

const TMVaccines = ({ petName, petId, visible, setvisible, onCancel }) => {
  const [form] = Form.useForm();
  const [visibleForm, setvisibleForm] = useState(false);
  const [loading, setloading] = useState(false);
  const [vaccines, setvaccines] = useState([]);
  const [dataTemp, setdataTemp] = useState([]);
  const [update, setupdate] = useState(true);
  const [activeTab, setactiveTab] = useState("history");
  const [data, setdata] = useState([
    {
      data: [],
      key: "history",
    },
    {
      data: [],
      key: "active",
    },
  ]);
  const [, setstate] = useState(false);

  const newplan = () => {
    setvisible(false);
    setvisibleForm(true);
  };

  const resetData = () => {
    setdata([
      {
        data: [],
        key: "history",
      },
      {
        data: [],
        key: "active",
      },
    ]);
  };

  const cancel = () => {
    setvisible(true);
    setvisibleForm(false);
    form.resetFields();
  };

  if (update) {
    dataTemp.forEach((doc) => {
      let temp = {
        ...doc,
        key: doc.id,
        initialDate: formatDate(doc.initialDate),
      };
      setdata((state) => {
        if (doc.status === "pendiente") {
          let temp2 = [];
          for (let i = 0; i < temp.dose; i++) {
            temp2.push({
              ...temp,
              key: i,
              dateApplied: doc.appliedVaccine
                ? doc.appliedVaccine[i]
                  ? formatDate(doc.appliedVaccine[i])
                  : "--"
                : "--",
              actions: doc.appliedVaccine && doc.appliedVaccine[i] ? (
                <Icon
                  name="CheckCircleTwoTone"
                  style={{ fontSize: 25 }}
                  twoToneColor="#52c41a"
                />
              ) : (
                <Button type="primary" onClick={() => apliedVaccine(doc.id)}>
                  Aplicada
                </Button>
              ),
            });
          }
          for (const item of state) {
            if (item.key === "active") {
              item.data = temp2;
            }
          }
        } else {
          for (const item of state) {
            if (item.key === "history") {
              item.data = item.data.concat([temp]);
            }
          }
        }
        return state;
      });
    });
    setupdate(false);
    setloading(false);
  }

  const apliedVaccine = async (id) => {
    setloading(true);
    const date = new Date();
    let token = await getToken();
    let res = await appliedVaccineToPet(token.token, petId, id, date.getTime());
    if (res.success) {
      message.success(res.message);
      resetData();
      getDataVaccines(petId);
    } else {
      message.error(res.error);
      setloading(false);
    }
  };

  const getDataVaccines = async (petId) => {
    setloading(true);
    let vaccines = await getVaccinesByPet(petId);
    if (vaccines.success) {
      setdataTemp(vaccines.data);
      setupdate(true);
    } else {
      message.error(vaccines.error);
      setloading(false);
    }
  };

  const getData = async (array) => {
    setloading(true);
    let res = await getVaccines();
    if (res.success) {
      for (const field of array) {
        switch (field.name) {
          case "vaccine":
            let options = [];
            res.data.forEach((doc) => {
              options.push({
                label: doc.vaccine,
                value: doc.id,
              });
            });
            field.component = (
              <Select options={options} style={{ width: 200 }} />
            );
            break;
          default:
            break;
        }
      }
      setvaccines(res.data);
    } else {
      message.error(res.error);
    }
    setloading(false);
  };

  useEffect(() => {
    if (visibleForm) {
      getData(fieldsFormNewVaccines);
    }
  }, [visibleForm]);

  useEffect(() => {
    if (visible) {
      getDataVaccines(petId);
    }
  }, [petId, visible]);

  const Validate = (value) => {
    if (value.vaccine) {
      let vaccine = vaccines.filter((e) => e.id === value.vaccine)[0];
      let options = [];
      vaccine.forPets.forEach((type) => {
        options.push({
          label: type.pets,
          value: JSON.stringify(type),
        });
      });
      fieldsFormNewVaccines.forEach((field) => {
        if (field.name === "petType") {
          field.component = <Select options={options} style={{ width: 130 }} />;
        }
      });
      setstate((state) => !state);
    }
  };

  const Extra = () => (
    <Button
      type="primary"
      onClick={newplan}
      icon={<Icon name="PlusOutlined" />}
      disabled={data.filter((e) => e.key === "active")[0].data.length > 0}
    >
      Iniciar Plan
    </Button>
  );

  const onFinish = async (values) => {
    setloading(true);
    values.vaccineName = vaccines.filter(
      (e) => e.id === values.vaccine
    )[0].vaccine;
    values = {
      ...values,
      ...JSON.parse(values.petType),
    };
    values.initialDate = values.initialDate.valueOf();
    delete values.petType;
    let token = await getToken();
    let res = await addVaccinesPet(token.token, petId, values);
    if (res.success) {
      message.success(res.message);
      cancel();
      getDataVaccines(petId);
    } else {
      message.error(res.error);
      setloading(false);
    }
  };

  return (
    <>
      <ModalTable
        title={`Vacunas de ${petName}`}
        extra={[
          null,
          {
            component: <Extra />,
            key: "active",
          },
        ]}
        visible={visible}
        hiddenSearch
        onCancel={() => {
          onCancel();
          setactiveTab("history");
          resetData();
        }}
        loading={loading}
        columns={[
          {
            columns: columnsTableHistoryVaccines,
            key: "history",
          },
          {
            columns: columnsTableVaccines,
            key: "active",
          },
        ]}
        dataSource={data}
        tabs={[
          { label: "Historial de vacunas", key: "history" },
          { label: "Plan Activo", key: "active" },
        ]}
        activeKey={activeTab}
        onChangeTabs={(e) => setactiveTab(e)}
        width={800}
      />
      <ModalForm
        title="Nuevo plan de vacunacion"
        visible={visibleForm}
        onCancel={cancel}
        spinning={loading}
        onValuesChange={Validate}
        validateStatus={[0, 0, 0, 0, 0]}
        fields={fieldsFormNewVaccines}
        onFinish={onFinish}
        onFinishFailed={() => message.error("No pueden quedar campos vacios")}
        primaryButton="Activar plan"
        defaultButton="Cancelar"
        width={500}
        form={form}
      />
    </>
  );
};

export default TMVaccines;
