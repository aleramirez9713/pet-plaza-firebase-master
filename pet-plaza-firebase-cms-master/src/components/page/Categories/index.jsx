import React, { useState, useEffect } from "react";
import { getTypes } from "../../../hooks";
import { TNewCategory } from "../../templates";
import { ContentTable } from "../../organisms";
import { useParams, Link } from "react-router-dom";
import { columnsTableCategories } from "../../../consts";
import "./style.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type } = useParams();

  const getData = async (type) => {
    setLoading(true);
    let data = await getTypes(type);
    if (data.success) {
      let temp = [];
      data.data.forEach((item) => {
        temp.push({
          ...item,
          action: (<Link to={`/${type}/categories/${item.id}`}>Detalles</Link>),
          active: item.active ? "Si" : "No",
          type: item.type === "medicines" ? "Medicina" : "Alimento"
        });
      });
      setCategories(temp);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(type);
  }, [type]);

  const New = <TNewCategory loadData={() => getData(type)} type={type} />;

  return (
    <ContentTable
      data={categories}
      Affix={New}
      loading={loading}
      columns={columnsTableCategories}
    />
  );
};
export default Categories;
