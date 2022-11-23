import React, { useState } from "react";
import {message} from "../../atoms";
import { Avatar } from "../../molecules";
import {
  columnsTableProducts,
  formatterHNL,
  filtersOfProductsOnCategories,
} from "../../../consts";
import { TypeInProducts, getToken, handleOnSearch } from "../../../hooks";
import { ModalTable } from '../../organisms';

const TModalProducts = ({
  id,
  getData,
  products,
  withCategory,
  visible,
  onCancel,
  loadindModal,
}) => {
  const [productSelect, setProductSelect] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
  });
  const [loading, setLoading] = useState(false);
  let data = [];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setProductSelect(selectedRowKeys);
    },
    selectedRowKeys: productSelect,
  };

  const typeInProducts = async (action) => {
    setLoading(true);
    let token = await getToken();
    if (token.success) {
      let response = await TypeInProducts(
        token.token,
        productSelect,
        id,
        action
      );
      if (response.success) {
        message.success(response.message)
        getData(withCategory);
      } else {
        message.error(response);
      }
      setProductSelect([]);
    } else {
      message.error(token.error);
    }
    setLoading(false);
  };

  products.forEach((element) => {
    data.push({
      key: element.id,
      image: element.images ? (
        <Avatar size={64} src={element.images[0] ? element.images[0].url :""} />
      ) : (
        <Avatar size={64}>Img</Avatar>
      ),
      code: element.code,
      name: element.name,
      description: element.description,
      hidden: element.hidden ? "Activo" : "Inactivo",
      position: element.position,
      type: element.type,
      price: formatterHNL.format(Math.ceil(element.price)),
    });
  });
  const onChange = (e) => {
    let newFilter = Object.assign({}, filter, { search: e.target.value });
    setFilter(newFilter);
  };

  return (
    <ModalTable
      title={withCategory ? "Productos de la categoría" : "Productos"}
      visible={visible}
      onCancel={onCancel}
      onChange={onChange}
      placeholderExtra="por nombre o código"
      loading={loading ? loading : loadindModal}
      rowSelection={{ ...rowSelection }}
      columns={columnsTableProducts}
      dataSource={handleOnSearch(
        filter,
        data,
        filtersOfProductsOnCategories
      )}
      onClick={() => typeInProducts(withCategory ? "delete" : "add")}
      danger={withCategory}
      textButton={withCategory ? "Eliminar Productos" : "Añadir Productos"}
    />
  );
};

export default TModalProducts;
