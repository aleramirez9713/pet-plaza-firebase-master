import React, { useState, useEffect, Fragment } from "react";
import { ContentTable } from "../../organisms";
import {
  getCollaborators,
  removeCollaborator,
  getToken,
  handleOnSearch,
  uploadCollaborator,
} from "../../../hooks";
import { message, Space, Form, Switch, confirm, Icon } from "../../atoms";
import { TMCollaborator } from "../../templates";
import { Search } from "../../molecules";
import { ButtonEdit, DeleteButton, ButtonAdd } from "../../molecules";
import { columnsTableCollaborators } from "../../../consts";
import { useUser } from "../../../Context";
import "./style.css";

const Collaborators = () => {
  const [form] = Form.useForm();
  const { userInfo } = useUser()
  const [data, setdata] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [title, settitle] = useState("");
  const [collaborator, setcollaborator] = useState({});
  const [buildData, setbuildData] = useState(true);
  const [search, setsearch] = useState("");

  const update = (values) => {
    settitle("Actualizar ");
    form.setFieldsValue({
      ...values,
      role: values.role.id,
    });
    setcollaborator(values);
    setvisible(true);
  };

  const remove = async (id) => {
    let user = data.filter((doc) => doc.id === id);
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `Desea eliminar el usuario ${user[0].name}`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let token = await getToken();
        let response = await removeCollaborator(token.token, id, "collaborators");
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response);
        }
        getData();
      },
      onCancel() {},
    });
  };

  const getData = async (id) => {
    setloading(true);
    let response = await getCollaborators(id);
    if (response.success) {
      setdata(response.data);
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
          id
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

  if (buildData) {
    let temp = [];
    data.forEach((element) => {
      temp.push({
        ...element,
        key: element.id,
        role: element.role.role,
        enable: (
          <Switch
            checked={element.enable}
            onChange={(value) => updateEnable(element.id, value)}
          />
        ),
        actions: (
          <Space>
            <ButtonEdit onClick={() => update(element)} table />
            <DeleteButton onClick={() => remove(element.id)} />
          </Space>
        ),
      });
    });
    setdataSource(temp);
    setbuildData(false);
    setloading(false);
  }

  useEffect(() => {
    getData(userInfo.id);
  }, [userInfo]);

  const onCancel = () => {
    setvisible(false);
    form.resetFields();
  };

  return (
    <Fragment>
      <ContentTable
        search={<Search onChange={(e) => setsearch(e.target.value)} />}
        Affix={
          <ButtonAdd
            onClick={() => {
              settitle("Agregar ");
              setvisible(true);
            }}
            text="Agregar personal"
          />
        }
        loading={loading}
        columns={columnsTableCollaborators}
        data={handleOnSearch([search], dataSource, [
          { filter: "name" },
          { filter: "email" },
        ])}
      />
      <TMCollaborator
        title={title}
        visible={visible}
        onCancel={onCancel}
        form={form}
        data={collaborator}
        getData={() => getData()}
        setTitle={(e) => settitle(e)}
      />
    </Fragment>
  );
};

export default Collaborators;
