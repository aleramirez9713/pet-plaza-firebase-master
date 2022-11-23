import React, { useState, useEffect, Fragment } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getOneCategory, removeTypeStore, getToken } from "../../../hooks";
import { TDetailCategory, TEditCategory } from "../../templates";
import { Loading } from "../../molecules";
import { NoData } from "../../organisms";
import {
  Row,
  Col,
  Button,
  Space,
  Form,
  message,
  confirm,
  Icon,
} from "../../atoms";
import "./style.css";

const DetailsCategory = () => {
  const [info, setInfo] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [visibleEditCategory, setVisibleEditCategory] = useState(false);
  const [form] = Form.useForm();
  const { id, type } = useParams();

  const getData = async (id) => {
    setLoading(true);
    let data = await getOneCategory(id);
    if (data.success) {
      setInfo(data.data);
    } else {
      setErr(true);
    }
    setLoading(false);
  };

  const resetData = () => {
    setInfo({});
    getData(id);
  };

  const deleteCategory = () => {
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `La categoría ${info.name} se eliminará`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let token = await getToken();
        if (token.success) {
          let response = await removeTypeStore(token.token, id);
          if (response.success) {
            setRedirect(true);
          } else {
            message.error(response);
          }
        } else {
          message.error(token.error);
        }
        setLoading(false);
      },
      onCancel() {},
    });
  };

  const onCancelEditCategory = () => {
    setVisibleEditCategory(false);
    form.resetFields();
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const viewFormEditCategories =()=>{
    form.setFieldsValue(info)
    setVisibleEditCategory(true)
  }

  return (
    <Fragment>
      {!loading ? (
        Object.entries(info).length > 0 ? (
          redirect ? (
            <Redirect to={`/${type}/categories`} />
          ) : (
            <Row className="content-space-full">
              <Col span={24} className="buttons-edit-clear">
                <Space>
                  <TEditCategory
                    onClick={viewFormEditCategories}
                    visible={visibleEditCategory}
                    onCancel={onCancelEditCategory}
                    resetData={resetData}
                    id={id}
                    info={info}
                    form={form}
                  />
                  <Button type="primary" danger onClick={deleteCategory}>
                    Eliminar
                  </Button>
                </Space>
              </Col>
              <TDetailCategory
                type={type}
                id={id}
                isLoading={()=>setLoading(!loading)}
                getDataDetails={()=>getData(id)}
                info={info}
              />
            </Row>
          )
        ) : (
          <NoData visible={err} onCancel={() => setErr(false)} />
        )
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};
export default DetailsCategory;
