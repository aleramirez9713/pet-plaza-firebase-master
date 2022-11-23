import React, { useState } from "react";
import {
  RangePicker,
  Space,
  message,
  Form,
  Button,
  Icon,
  Popover,
} from "../../atoms";
import { Search, DownLoadButton, DinamicSelect } from "../../molecules";
import { columnsExel, formatDate } from "../../../consts";
import {
  getOrdersByTimeRange,
  getToken,
  exportExcel,
  disabledDateAfterToday,
} from "../../../hooks";
import moment from "moment";
import "./style.css";

const THOrders = ({ onChange, onSearch, onClick, stores, getData }) => {
  const [range, setRange] = useState([]);
  const [loading, setloading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const date = new Date();
  const [form] = Form.useForm();
  const form2 = Form.useForm()[0];

  const getOrdersByRange = async () => {
    setloading(true);
    let token = await getToken();
    if (token.success) {
      let response = await getOrdersByTimeRange(token.token, range);
      if (response.success) {
        let data = [];
        response.data.forEach((doc) => {
          date.setTime(doc.date.milliseconds);
          data.push({
            shippingCost: doc.shippingCost ? doc.shippingCost : 0,
            total: doc.total,
            subtotal: doc.subtotal,
            orderType: doc.orderType === "pick" ? "Pick-and-Go" : "Delivery",
            store: doc.store,
            status: doc.status,
            orderId: doc.id,
            date: date.toLocaleDateString(),
            hour: date.toLocaleTimeString(),
            "buyer-name": doc.buyer.fullName,
            "buyer-phone": doc.buyer.phone,
            "shipping-address-complete": doc.shipping.fullAddress,
          });
        });
        const d = new Date();
        exportExcel(
          data,
          columnsExel,
          `Reporte-${formatDate(range[0])}-${formatDate(
            range[1]
          )}-${d.getTime()}`
        );
      } else {
        message.error(response);
      }
    } else {
      message.error(token.message);
    }
    form.setFieldsValue({
      date: [null, null],
    });
    setdisabled(true);
    setloading(false);
  };

  const onChangeRange = (value) => {
    if (value) {
      setRange([
        value[0] ? value[0].valueOf() : null,
        value[1] ? value[1].valueOf() : null,
      ]);
    }
  };

  const onChangeValues = (values) => {
    if (values) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  };

  const Clear = () => {
    onClick();
    form2.resetFields();
  };

  const filters = (
    <Form
      form={form2}
      initialValues={{ status: "", store: "" }}
      onValuesChange={onChange}
      layout="vertical"
    >
      <Form.Item label="Tienda:" name="store">
        <DinamicSelect options={stores} style={{ width: 170 }} />
      </Form.Item>
      <Form.Item label="Estado:" name="status">
        <DinamicSelect
          options={[
            { value: "", text: "Seleccione un estado..." },
            { value: "proceso", text: "Proceso" },
            { value: "pendiente", text: "Pendiente" },
            { value: "finalizado", text: "Finalizado" },
            { value: "entregado", text: "Entregado" },
          ]}
          style={{ width: 170 }}
        />
      </Form.Item>
      <Form.Item label="Rango de fecha:" name="date">
        <RangePicker
          placeholder={["Fecha inicial", "Fecha final"]}
          disabledDate={disabledDateAfterToday}
          showTime={{
            hideDisabledOptions: true,
            defaultValue: [
              moment("00:00:00", "HH:mm:ss"),
              moment("23:59:59", "HH:mm:ss"),
            ],
          }}
          format="DD/MM/YYYY"
        />
      </Form.Item>
      <Button type="primary" onClick={Clear}>
        Limpiar
      </Button>
    </Form>
  );

  return (
    <div className="content-header">
      <Form form={form} className="search-content">
        <Space>
          <Form.Item>
            <Search
              onSearch={onSearch}
              onChange={onChange}
              placeholderExtra="por Código de orden"
            />
          </Form.Item>
          <Form.Item>
            <Popover
              placement="bottom"
              content={filters}
              title="Filtros"
              trigger="click"
            >
              <Button icon={<Icon name="ControlOutlined" />} />
            </Popover>
          </Form.Item>
          <Form.Item>
            <Button icon={<Icon name="ReloadOutlined" />} onClick={getData} />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item>
            <DownLoadButton
              onClick={getOrdersByRange}
              loading={loading}
              text="Reporte"
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item name="date">
            <RangePicker
              placeholder={["Fecha inicial", "Fecha final"]}
              onCalendarChange={onChangeRange}
              onChange={onChangeValues}
              disabledDate={disabledDateAfterToday}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  moment("00:00:00", "HH:mm:ss"),
                  moment("23:59:59", "HH:mm:ss"),
                ],
              }}
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Space>
      </Form>

    </div>
  );
};

export default THOrders;
