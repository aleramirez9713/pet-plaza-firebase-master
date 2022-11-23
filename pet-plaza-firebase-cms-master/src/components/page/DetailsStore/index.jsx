import React, { useEffect, useState, Fragment } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getAStore, getToken, removeStore } from "../../../hooks";
import { message, Row, Space, Col, Button, Icon, confirm } from "../../atoms";
import { Loading, ModalImage, ButtonEdit } from "../../molecules";
import { ContentDetailsCards, ModalMap } from "../../organisms";
import { TEStore } from "../../templates";
import "./style.css";

const DetailsStore = () => {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [visibleImage, setVisibleImage] = useState();
  const [loading, setloading] = useState(false);
  const [coordinates, setcoordinates] = useState({});
  const [visibleMapa, setvisibleMapa] = useState(false);
  const [visibleEditModal, setvisibleEditModal] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const getData = async (id) => {
    setloading(true);
    let response = await getAStore(id);
    if (response.success) {
      setdata(response.data);
    } else {
      message.error(response.error);
    }
    setloading(false);
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const showModal = (coordinates) => {
    setcoordinates(coordinates);
    setvisibleMapa(true);
  };
  const onCancel = () => {
    setvisibleMapa(false);
    setcoordinates({});
  };

  const remove = () => {
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `La tienda ${data.name} se eliminará`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let token = await getToken();
        let response = await removeStore(token.token, id);
        if (response.success) {
          message.success(response.message);
          setRedirect(true);
        } else {
          message.error(response);
        }
      },
      onCancel() {},
    });
  };

  return (
    <Row className="content-store-full">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {redirect ? (
            <Redirect to={`/store`} />
          ) : (
            <Fragment>
              <Col span={24} className="content-edit-delete-store">
                <Space>
                  <ButtonEdit onClick={() => setvisibleEditModal(true)} />
                  <Button type="primary" onClick={remove} danger>
                    Eliminar
                  </Button>
                </Space>
              </Col>
              <Row className="scroll-y-section-store-details">
                <ContentDetailsCards
                  cardInfo={{
                    span: {
                      xs: 24,
                      sm: 24,
                      md: 24,
                      lg: 24,
                    },
                    width: 800,
                    className: "content-details-store-full",
                    title: "Detalles de la tienda",
                    info: [
                      { label: "Nombre", item: data.name },
                      { label: "Teléfono", item: data.phone },
                      { label: "Dirección exacta", item: data.address },
                      {
                        label: "Horario",
                        item: (
                          <ul className="list-horaries">
                            {data.horaries
                              ? data.horaries.map((item, i) => (
                                  <li key={i}>
                                    {item.day +
                                      " " +
                                      item.openingTime +
                                      " a " +
                                      item.closeTime}
                                  </li>
                                ))
                              : null}
                          </ul>
                        ),
                      },
                    ],
                    actions: [
                      {
                        onClick: () => showModal(data.coordinates),
                        text: "Mapa",
                      },
                    ],
                  }}
                />
                <ModalImage
                  title={data.name}
                  visible={visibleImage}
                  image={data.image}
                  onCancel={() => setVisibleImage(false)}
                />
                <ModalMap
                  coordinates={coordinates}
                  name=""
                  visible={visibleMapa}
                  onCancel={onCancel}
                />
                <TEStore
                  visible={visibleEditModal}
                  handleOnCancel={() => setvisibleEditModal(false)}
                  data={data}
                  id={id}
                  getData={() => getData(id)}
                />
              </Row>
            </Fragment>
          )}
        </Fragment>
      )}
    </Row>
  );
};

export default DetailsStore;
