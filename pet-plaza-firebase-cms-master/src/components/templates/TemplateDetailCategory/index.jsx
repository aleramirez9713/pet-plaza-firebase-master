import React, { useState, useEffect } from "react";
import { Row, message, Button, confirm, Icon } from "../../atoms";
import { getProducts, updateTypeStore, getToken } from "../../../hooks";
import { TModalProducts } from "../";
import { useParams } from "react-router-dom";
import { ContentDetailsCards } from "../../organisms";
import "./style.css";

const TDetailCategory = (props) => {
  const [visibleProducts, setVisibleProducts] = useState(false);
  const [withCategoryModal, setWithCategoryModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, settotalProducts] = useState(0);
  const [loadindModal, setLoadindModal] = useState(false);
  const { type } = useParams();

  const getData = async (withCategory) => {
    setLoadindModal(true);
    let data = await getProducts(props.id, withCategory, type);
    if (data.success) {
      setProducts(data.data);
    } else {
      message.error(data.error);
    }
    setLoadindModal(false);
  };

  const getTotalProducts = async (id, type) => {
    let data = await getProducts(id, true, type);
    if (data.success) {
      settotalProducts(data.data.length);
    } else {
      settotalProducts("err");
    }
  };

  const updateTotalProducts = async () => {
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `Se cambiará el total de productos de ${props.info.totalProducts} producto(s) a ${totalProducts} producto(s) para actualizar la base de datos.`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let token = await getToken();
        if (!token.success) {
          message.error("Error en la Actualizacion");
        }
        let response = await updateTypeStore(
          token.token,
          { totalProducts: totalProducts },
          props.id
        );
        if (response.success) {
          message.success(response.message);
          props.getDataDetails();
        } else {
          message.error(response);
        }
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    getTotalProducts(props.id, type);
  }, [props.id, type]);

  const onCancelProducts = () => {
    setVisibleProducts(false);
    setProducts([]);
  };

  const addProducts = () => {
    setVisibleProducts(true);
    setWithCategoryModal(false);
    getData(false);
  };
  const viewProducts = () => {
    setVisibleProducts(true);
    setWithCategoryModal(true);
    getData(true);
  };

  return (
    <Row className="content-space">
      <ContentDetailsCards
        cardInfo={{
          span: {},
          title: "Detalles de la categoría",
          info: [
            { label: "Nombre", item: props.info.name },
            {
              label: "Producto Total",
              item:
                totalProducts !== "err" ? (
                  totalProducts === props.info.totalProducts ? (
                    totalProducts
                  ) : (
                    <Button type="primary" onClick={updateTotalProducts} danger>
                      Actualizar
                    </Button>
                  )
                ) : (
                  <Button
                    type="link"
                    onClick={() => document.location.reload()}
                  >
                    Recargar pagina
                  </Button>
                ),
            },
            { label: "Posición", item: props.info.position },
            {
              label: "Visible en APP",
              item: props.info.active ? "Si" : "No",
            },
            {
              label: "Tipo de categoría",
              item: props.info.type === "medicines" ? "Medicina" : "Alimento",
            },
          ],
          actions: [
            {
              onClick: addProducts,
              text: "Agregar productos",
            },
            {
              onClick: viewProducts,
              text: "Ver productos",
            },
          ],
        }}
      />
      <TModalProducts
        visible={visibleProducts}
        onCancel={onCancelProducts}
        getDataDetails={props.getDataDetails}
        getData={getData}
        withCategory={withCategoryModal}
        loadindModal={loadindModal}
        id={props.id}
        products={products}
      />
    </Row>
  );
};
export default TDetailCategory;
