import React, { useState, useEffect } from "react";
import { Search } from "../../molecules";
import { getStores } from "../../../hooks";
import { ContentTable } from "../../organisms";
import { message, Form } from "../../atoms";
import { TNStore } from "../../templates";
import { columnsTableStore } from "../../../consts";
import { Link } from "react-router-dom";

import "./style.css";

const Stores = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [lengthLastData, setlengthLastData] = useState(0);
  const [loading, setloading] = useState(true);
  const [visible, setvisible] = useState(false);
  const [lastRecord, setlastRecord] = useState(undefined);
  const [search, setsearch] = useState(undefined);

  const getData = async (lastRecord, search, typeConsult) => {
    setloading(typeConsult);
    let response = await getStores(lastRecord, search);
    if (response.success) {
      let temp = [];
      response.data.forEach((e) => {
        temp.push({
          ...e,
          key: e.id,
          phone: "Tel. " + e.phone,
          action: <Link to={`store/${e.id}`}>Detalles</Link>
        });
        setlastRecord(e.name);
      });
      setData((prev) => (typeConsult ? temp : prev.concat(temp)));
      setlengthLastData(response.data.length);
    } else {
      message.error(response.error);
    }
    setloading(false);
  };

  useEffect(() => {
    getData(undefined, undefined, true);
  }, []);

  const onChange = (e) => {
    let str = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();
    str = str.replace(/ /g, "");
    if (str === "") {
      getData(undefined, undefined, true);
      setsearch(undefined);
    } else {
      getData(undefined, str, true);
      setsearch(str);
    }
  };

  return (
    <ContentTable
      loading={loading}
      loadMore={() => getData(lastRecord, search, false)}
      hasMore={lengthLastData === 10}
      columns={columnsTableStore}
      data={data}
      search={
        <Search onChange={onChange} />
      }
      Affix={
          <TNStore
            onClick={() => setvisible(true)}
            handleOnCancel={() => {
              setvisible(false);
              form.resetFields();
            }}
            visible={visible}
            form={form}
            getData={() => getData(undefined, undefined, true)}
          />
      }
    />
  );
};

export default Stores;
