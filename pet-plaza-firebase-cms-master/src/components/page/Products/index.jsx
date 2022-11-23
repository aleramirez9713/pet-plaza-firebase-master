import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Space, Icon } from "../../atoms";
import { getProductsByType, getTypesForSelect } from "../../../hooks";
import { DinamicSelect, Search, Avatar } from "../../molecules";
import { ContentTable } from "../../organisms";
import { TNewProduct } from "../../templates";
import { columnsTableProductsView } from "../../../consts";
import "./style.css";

const Products = () => {
  const [state, setState] = useState({
    products: [],
    lastLoadLength: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setfilter] = useState({
    search: "",
  });
  const [lastRecord, setlastRecord] = useState("");
  const [categories, setcategories] = useState([]);
  const [update, setupdate] = useState(true);
  const { type, category } = useParams();
  const history = useHistory();

  const getData = async (search, consultType, type, lastRecord, category) => {
    setLoading(true)
    let response = await getProductsByType(lastRecord, search, type, category);
    if (response.success) {
      let categories = await getTypesForSelect(type);
      setcategories(categories);
      let temp = [];
      response.data.forEach((item) => {
        temp.push({
          ...item,
          key: item.id,
          available: item.available ? "Disponible" : "No Disponible",
          image: item.images.length ? (
            <Avatar src={item.images[0].url} size={60} />
          ) : (
            <Avatar>{item.name[0]}</Avatar>
          ),
          action: (
            <Link to={`/${type}/products/${item.id}`}>
              Detalles
              <Icon name="RightOutlined" />
            </Link>
          ),
        });
        setlastRecord(item.name);
      });
      setState((prevState) => {
        let asign = [];
        if (!consultType) {
          asign = temp;
        } else {
          asign = prevState.products.concat(temp);
        }
        asign = [...new Set(asign)];
        return {
          products: asign,
          lastLoadLength: temp.length,
        };
      });
      setLoading(false);
      setupdate(false);
    }
  };

  const onChange = (e) => {
    let str = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();
    str = str.replace(/ /g, "");
    getData(str, false, type, false);
    setfilter({ search: str });
  };

  useEffect(() => {
    if (update) {
      getData(false, false, type, false, category);
    }
  }, [type, category, update]);

  return (
    <ContentTable
      search={
        <Space>
          <Search onChange={onChange} />
          <DinamicSelect
            options={[{ text: "Sin categoría", value: null }, ...categories]}
            defaultValue={category}
            style={{ width: 130 }}
            onChange={(value) => {
              value
                ? history.push(`/${type}/products/category/${value}`)
                : history.push(`/${type}/products`);
            }}
          />
        </Space>
      }
      Affix={
        <TNewProduct
          getData={() => {
            getData(filter.search, true, type, lastRecord, category);
          }}
          type={type}
          image
          listFile
        />
      }
      loading={loading}
      loadMore={() => getData(filter.search, true, type, lastRecord, category)}
      hasMore={state.lastLoadLength === 10}
      columns={columnsTableProductsView}
      data={state.products}
    />
  );
};

export default Products;
