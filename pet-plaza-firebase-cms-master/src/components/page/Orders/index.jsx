import React, { useEffect, useState } from "react";
import { Row, Button, message } from "../../atoms";
import { TMDetailsOrder, THOrders } from "../../templates";
import { ContentTable } from "../../organisms";
import { columnsTableOrders, formatterHNL, formatDate } from "../../../consts";
import {
  getOrdersByBlock,
  getOrdersById,
  getStoresForSelect,
} from "../../../hooks";
import "./style.css";

const Orders = () => {
  const [state, setState] = useState({
    orders: [],
    lastLoadLength: 0,
  });
  const [dataSource, setdataSource] = useState([]);
  const [updateData, setupdateData] = useState(true);
  const [buildData, setbuildData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [lastItem, setLastItem] = useState({});
  const [idOrder, setIdOrder] = useState("");
  const [stores, setstores] = useState([]);
  const [filter, setfilter] = useState({
    status: undefined,
    store: undefined,
  });
  const [range, setrange] = useState(undefined);

  const getData = async (
    lastItem,
    state,
    consultType,
    filter,
    range,
    store
  ) => {
    setIsLoading(!consultType);
    const response = await getOrdersByBlock(lastItem, filter, range, store);
    if (response.success) {
      setState((prevState) => ({
        ...prevState,
        orders: consultType
          ? state.orders.concat(response.data)
          : response.data,
        lastLoadLength: response.data.length,
      }));
    } else {
      message.error(response.error);
    }
    setupdateData(false);
    setbuildData(true);
  };

  if (buildData) {
    let orderList = [];
    state.orders.forEach((doc) => {
      const date = new Date();
      date.setTime(doc.date.milliseconds);
      orderList.push({
        key: doc.id,
        tags: doc.date.milliseconds,
        orderId: doc.id,
        date: formatDate(doc.date.milliseconds),
        time: date.toLocaleTimeString(),
        "buyer-phone": doc.buyer.phone ? doc.buyer.phone : "No definido",
        paymentMethod: doc.shipping.paymentMethod.card ? "Tarjeta" : "Efectivo",
        total: formatterHNL.format(Math.ceil(doc.total ? doc.total : 0)),
        orderType: doc.orderType === "pick" ? "Pick-and-Go" : "Delivery",
        status: doc.status,
        actions: (
          <Button
            onClick={() => {
              setIdOrder(doc.id);
              setVisible(true);
            }}
          >
            Ver detalle
          </Button>
        ),
      });
      setLastItem(doc.date.milliseconds);
    });
    setdataSource(orderList);
    setbuildData(false);
    setIsLoading(false);
  }

  const onChange = (e) => {
    if (e) {
      if (e.target ? e.target.name === "search" : false) {
        if (e.target.value === "") {
          setupdateData(true);
          setLastItem(undefined);
        }
      } else {
        for (let field in e) {
          switch (field) {
            case "store":
              setfilter((prevState) => ({
                ...prevState,
                store: e[field],
              }));
              setupdateData(true);
              setLastItem(undefined);
              break;
            case "status":
              setfilter((prevState) => ({
                ...prevState,
                status: e[field],
              }));
              setupdateData(true);
              setLastItem(undefined);
              break;
            case "date":
              if (e[field][0] && e[field][1]) {
                setIsLoading(true);
                setrange(e[field]);
                setupdateData(true);
                setLastItem(undefined);
              }
              break;
            default:
              break;
          }
        }
      }
    }
  };

  const Clear = () => {
    setupdateData(true);
    setrange(undefined);
    setLastItem(undefined);
    setfilter({
      status: undefined,
      store: undefined,
    });
  };

  const onSearch = async (value) => {
    setIsLoading(true);
    const response = await getOrdersById(value);
    setState(
      response.success
        ? {
            orders: response.data,
            lastLoadLength: response.data.length,
          }
        : {
            orders: [],
            lastLoadLength: 0,
          }
    );
    setbuildData(true);
  };

  const getStores = async () => {
    let stores = await getStoresForSelect();
    setstores(stores);
  };

  useEffect(() => {
    if (updateData) {
      getStores();
      getData(lastItem, state, false, filter.status, range, filter.store);
    }
  }, [lastItem, state, updateData, filter, range]);

  return (
    <Row className="content-orders">
      <THOrders
        onChange={onChange}
        onSearch={onSearch}
        onClick={Clear}
        stores={stores}
        getData={() => getData(null, null, false, null, null, null)}
      />
      <ContentTable
        orders
        columns={columnsTableOrders}
        loading={isLoading}
        data={dataSource}
        loadMore={() =>
          getData(lastItem, state, true, filter.status, range, filter.store)
        }
        hasMore={state.lastLoadLength === 10}
      />
      <TMDetailsOrder
        visible={visible}
        onCancel={() => setVisible(false)}
        getData={getData}
        id={idOrder}
      />
    </Row>
  );
};

export default Orders;
