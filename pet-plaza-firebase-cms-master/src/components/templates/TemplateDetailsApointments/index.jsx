import React, { useState, useEffect } from "react";
import {
  Modal,
  Spin,
  Row,
  Col,
  Title,
  Descriptions,
  Table,
  Button,
  Form,
  DatePicker,
  Select,
  message,
} from "../../atoms";
import { Forms } from "../../molecules";
import {
  labelsOfInfoApointment,
  columnsTablePetsApointments,
  fieldsFormEditApointment,
  formatDate,
} from "../../../consts";
import {
  hoursString,
  getPet,
  freeDays,
  getToken,
  generateQuotas,
  Hours,
  updateApointment,
} from "../../../hooks";
import moment from "moment";
import "./style.css";

const TDApointments = ({
  title,
  visible,
  Cancel,
  width,
  data,
  vet,
  getData,
}) => {
  const [form] = Form.useForm();
  const [description, setdescription] = useState();
  const [pets, setpets] = useState([]);
  const [loading, setloading] = useState(false);
  const [moveApointment, setmoveApointment] = useState(false);
  const vetObj = vet.length > 0 && JSON.parse(vet[0].value);
  const [hour, sethour] = useState([]);
  const [dateSelected, setdateSelected] = useState(null);
  const [, setstate] = useState(true);

  useEffect(() => {
    if (data) {
      setdescription({
        ...data,
        ...data.user,
      });
    }
  }, [data]);

  const buildInfoPets = (data) => {
    return {
      ...data,
      key: data.id ? data.id : data.name,
      description: data.type,
      gender:
        data.gender === "male" ? "Macho" : data.gender === "female" && "Hembra",
    };
  };

  const build = (array, hours, vetSelected) => {
    for (const field of array) {
      switch (true) {
        case field.name === "date":
          field.component = (
            <DatePicker
              disabledDate={(date) => {
                const d = new Date();
                if (
                  formatDate(date.valueOf()) === formatDate(d.getTime()) ||
                  date.valueOf() > d.getTime()
                ) {
                  let days = freeDays(vetSelected, date);
                  return typeof days === "boolean" ? days : days.length === 0;
                } else {
                  return true;
                }
              }}
            />
          );
          break;
        case field.name === "hour":
          field.component = (
            <Select
              options={hours}
              style={{ width: 180 }}
              placeholder="Cupos"
            />
          );
          break;
        default:
          break;
      }
    }
    setstate((state) => !state);
  };

  const getQuotas = async (pets, date, vetId) => {
    setloading(true);
    let token = await getToken();
    let quotas = await generateQuotas(token.token, vetId, date, pets);
    if (quotas.success) {
      let temp = [];
      quotas.data.forEach((doc) => {
        let label = `${Hours[doc[0]]}:${doc[1] === 30 ? doc[1] : "00"} ${
          doc[0] > 12 ? "PM" : "AM"
        }`;
        let value = `${doc[0]}:${doc[1] === 30 ? doc[1] : "00"}`;
        temp.push({ label, value });
      });
      sethour(temp);
    } else {
      message.error("Error:", "error al obtener los cupos");
    }
    setloading(false);
  };

  useEffect(() => {
    if (dateSelected) {
      form.setFieldsValue({
        hour: undefined,
      });
      let vetObj = JSON.parse(vet[0].value);
      getQuotas(pets.length, dateSelected, vetObj.id);
    }
  }, [pets, dateSelected, vet, form]);

  useEffect(() => {
    if (vet.length > 0) {
      let vetObj = JSON.parse(vet[0].value);
      build(fieldsFormEditApointment, hour, vetObj);
    }
  }, [hour, vet]);

  useEffect(() => {
    const get = async () => {
      setloading(true);
      let temp = [];
      for (const pet of data.pets) {
        let res = await getPet(pet.petId);
        if (res.success) {
          temp.push(buildInfoPets({ ...res.data, ...pet }));
        }
      }
      setpets(temp);
      setloading(false);
    };
    if (data.pets && visible && data.user) {
      if (data.user.id) {
        get();
      } else {
        setloading(true);
        let temp = [];
        for (const pet of data.pets) {
          temp.push(buildInfoPets(pet));
        }
        setpets(temp);
        setloading(false);
      }
    }
  }, [data, visible]);

  const buildInfo = (data, field) => {
    if (data) {
      let res;
      switch (field) {
        case "time":
          res = `${data * 60} min.`;
          break;
        case "date":
          const d = new Date(data);
          res = d.toLocaleDateString();
          break;
        case "hour":
          res = hoursString(data);
          break;
        default:
          res = data;
          break;
      }
      return res;
    }
  };

  const onFinish = async (values) => {
    setloading(true);
    values.date = values.date.format("M/D/YYYY");
    let token = await getToken();
    let response = await updateApointment(token.token, data.id, values);
    if (response.success) {
      message.success(response.message);
      getData();
      setmoveApointment(false);
      form.resetFields();
      Cancel();
    } else {
      message.error("Error: no se pudo crear la cita");
    }
    setloading(false);
  };

  return (
    <Modal
      title={`${title}`}
      visible={visible}
      onCancel={() => {
        Cancel();
        setmoveApointment(false);
        form.resetFields();
      }}
      width={moveApointment ? undefined : width}
      footer={null}
    >
      <Spin spinning={loading}>
        {!moveApointment ? (
          <Row>
            <Col span={24} className="move-apointment">
              {vetObj.fullName ? (
                <Title>Dr(a). {vetObj.fullName}</Title>
              ) : (
                <Spin />
              )}
              <Button
                type="primary"
                onClick={() => {
                  setmoveApointment(true);
                  form.setFieldsValue({
                    date: moment(description.date, "MM/DD/YYYY"),
                  });
                }}
              >
                Mover cita
              </Button>
            </Col>
            <Col span={24} className="info-general-apointment">
              <Title level={5}>Mascota(s)</Title>
              <Table
                scroll={{ x: true }}
                columns={columnsTablePetsApointments}
                dataSource={pets}
                size="middle"
                pagination={false}
              />
            </Col>
            <Col span={24} className="info-general-apointment">
              <Descriptions
                title="Información general:"
                column={3}
                layout="vertical"
              >
                {description &&
                  labelsOfInfoApointment.map((item) => (
                    <Descriptions.Item
                      key={item.field}
                      label={<b>{item.label}</b>}
                    >
                      {buildInfo(description[item.field], item.field)}
                    </Descriptions.Item>
                  ))}
              </Descriptions>
            </Col>
          </Row>
        ) : (
          <Forms
            validateStatus={[0, 0]}
            onCancel={() => {
              setmoveApointment(false);
              form.resetFields();
            }}
            onFinish={onFinish}
            onValuesChange={(e) => {
              if (e.date) setdateSelected(e.date.format("YYYY-MM-DD"));
            }}
            fields={fieldsFormEditApointment}
            primaryButton="Guardar"
            defaultButton="Cancelar"
            form={form}
          />
        )}
      </Spin>
    </Modal>
  );
};

export default TDApointments;
