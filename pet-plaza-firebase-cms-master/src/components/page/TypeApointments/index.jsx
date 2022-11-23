import React, { useState, useEffect } from "react";
import { ContentTable } from "../../organisms";
import { message, Space, Form, confirm, Icon } from "../../atoms";
import { Search, ButtonAdd, ButtonEdit, DeleteButton } from "../../molecules";
import { columnsTableTypeApointment } from "../../../consts";
import {
  getTypesAppointments,
  handleOnSearch,
  removeTypeApointment,
  getToken,
} from "../../../hooks";
import { TMTypeApointment } from "../../templates";

const TypeApointment = () => {
  const [form] = Form.useForm();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState();
  const [update, setupdate] = useState(false);
  const [visible, setvisible] = useState(false);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState();

  const getData = async () => {
    let res = await getTypesAppointments();
    if (res.success) {
      let temp = [];
      res.types.forEach((doc) => {
        temp.push({
          ...doc,
          key: doc.id,
        });
      });
      setdata(temp);
    } else {
      message.error("Error al obtener los tipos de citas");
    }
    setupdate(true);
  };

  const editItem = (item) => {
    form.setFieldsValue(item);
    setid(item.id);
    setedit(true);
    setvisible(true);
  };

  const remove = async (id) => {
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: "¿Seguro que desea borrar este tipo de cita?",
      okText: "Si",
      cancelText: "No",
      async onOk() {
        setloading(true);
        let token = await getToken();
        let res = await removeTypeApointment(token.token, id);
        if (res.success) {
          message.success(res.message);
          getData();
        } else {
          message.error("Error al borrar el tipo de cita");
        }
        setloading(false);
      },
      onCancel() {},
    });
  };

  if (update) {
    let temp = [];
    data.forEach((doc) => {
      temp.push({
        ...doc,
        actions: (
          <Space>
            <ButtonEdit table onClick={() => editItem(doc)} />
            <DeleteButton onClick={() => remove(doc.id)} />
          </Space>
        ),
      });
    });
    setdata(temp);
    setupdate(false);
    setloading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ContentTable
        loading={loading}
        columns={columnsTableTypeApointment}
        data={handleOnSearch([search], data, [
          { filter: "type" },
          { filter: "description" },
        ])}
        search={<Search onChange={(e) => setsearch(e.target.value)} />}
        Affix={
          <ButtonAdd
            text="Agregar tipo de cita"
            onClick={() => {
              setedit(false);
              setvisible(true);
            }}
          />
        }
      />
      <TMTypeApointment
        visible={visible}
        onCancel={() => {
          setvisible(false);
          form.resetFields();
        }}
        title={edit ? "Editar tipo de cita" : "Nuevo tipo de cita"}
        form={form}
        edit={edit}
        id={id}
        getData={getData}
      />
    </>
  );
};

export default TypeApointment;
