import React, { useState, Fragment } from "react";
import { Button, message, confirm, Icon } from "../../atoms";
import { Redirect, useParams } from "react-router-dom";
import { getToken, removeProductStore, removeStorage } from "../../../hooks";

const TDeleteProduct = ({ id, info }) => {
  const [redirect, setRedirect] = useState(false);
  const { type } = useParams();

  const removeProduct = () => {
    confirm({
      title: "Confirmación",
      icon: <Icon name="ExclamationCircleOutlined" />,
      content: `El producto ${info.name} de código ${info.code} se eliminará`,
      okText: "Aceptar",
      cancelText: "Cancelar",
      async onOk() {
        let err = false;
        for (let image in info.images) {
          let response = await removeStorage(info.images[image].url);
          if (!response.success) {
            err = true;
          }
        }
        let token = await getToken();
        if (!token.success) {
          err = true;
        }
        let response = await removeProductStore(token.token, id);
        if (!response.success) {
          err = true;
        }
        if (!err) {
          message.success(response.message);
          setRedirect(true);
        } else {
          message.error("Error en la solicitud");
        }
      },
      onCancel() {},
    });
  };
  return (
    <Fragment>
      <Button type="primary" danger onClick={removeProduct}>
        Eliminar
      </Button>
      {redirect ? <Redirect to={`/${type}/products/`} /> : null}
    </Fragment>
  );
};

export default TDeleteProduct;
