import React, { Fragment, useState, useEffect } from "react";
import { ModalForm } from "../../organisms";
import { fieldsFormNewProduct } from "../../../consts";
import { message, Form } from "../../atoms";
import {
  getLastPosition,
  beforeUpload,
  getToken,
  setProductStore,
  setStorage,
  getTypesForSelect,
} from "../../../hooks";
import { ButtonAdd, DinamicSelect } from "../../molecules";

const TNewProduct = (props) => {
  const [visible, setVisible] = useState(false);
  const [lastPosition, setLastPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validatePosition, setValidatePosition] = useState("");
  const [validatePrice, setValidatePrice] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const getPosition = async () => {
      setLoading(true)
      let response = await getLastPosition("products");
      if (response.success) {
        setLastPosition(response.data);
        form.setFieldsValue({
          position: response.data[0] + 1,
        });
      } else {
        setLastPosition("error");
      }
      if(fieldsFormNewProduct[0].name!=="category"){
        let types = await getTypesForSelect(props.type);
        const selectTypes = {
          name: "category",
          message: "Seleccione una categoría",
          component: <DinamicSelect placeholder="Categoría" options={types} />,
        };
        fieldsFormNewProduct.unshift(selectTypes);
      }
      setLoading(false);
    };
    if(visible) {
      getPosition();
    }
  }, [form, props.type,visible]);

  const Validate = (changedValues) => {
    let temp = [];
    for (let i in lastPosition) {
      if (changedValues.position === lastPosition[i]) {
        temp.push(1);
      } else {
        temp.push(0);
      }
    }
    if (
      typeof changedValues.position === "object" ||
      form.getFieldValue("position") === "" ||
      typeof changedValues.position === "string" ||
      changedValues.position < 1
    ) {
      setValidatePosition("error");
    } else {
      setValidatePosition("success");
    }
    for (let i in temp) {
      if (temp[i] === 1) {
        setValidatePosition("error");
      }
    }
    if (
      changedValues.price < 0 ||
      typeof changedValues.price === "string" ||
      form.getFieldValue("price") === ""
    ) {
      setValidatePrice("error");
    } else {
      setValidatePrice("success");
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const onFinishFailed = () => {
    message.error("No dejar campos vacíos.");
  };

  const onFinish = async (values) => {
    setLoading(true);
    values.images = [];
    for (let i = 0; i < values.upload.length; i++) {
      let response = await setStorage(
        values.upload[i].originFileObj,
        `${values.category}/products/${values.name}-${values.code}/`
      );
      if (response.success) {
        let imageRef = await response.imageRef[0];
        let downloadURL = await imageRef.ref.getDownloadURL();
        values.images.push({ position: i + 1, url: downloadURL });
      } else {
        message.error("Error en la solicitud, inténtelo de nuevo.");
      }
    }
    delete values.upload;
    values.description = values.description ? values.description : "";
    values.hidden = false;
    values.available = false;
    values.timesSold=0
    values.type=props.type
    values.keyWords = "";
    values[values.category]=true;
    delete values.category;
    let token = await getToken();
    if (token.success) {
      let response = await setProductStore(token.token, values);
      if (response.success) {
        props.getData();
        message.success("Producto agregado exitosamente.");
      } else {
        message.error("Error en la solicitud, inténtelo de nuevo.");
      }
    } else {
      message.error("Error en la solicitud, inténtelo de nuevo.");
    }
    setVisible(false);
    setLoading(false);
    form.resetFields();
  };

  const handleOnCancel = () => {
    setVisible(false);
    form.resetFields();
    if(fieldsFormNewProduct[0].name==="category"){
      fieldsFormNewProduct.shift();
    }
  };


  return (
    <Fragment>
      <ButtonAdd onClick={showModal} text="Nuevo Producto" />
      <ModalForm
        title="Nuevo producto"
        visible={visible}
        onCancel={handleOnCancel}
        spinning={loading}
        image={props.image}
        initialValues={{
          "available-true": true,
        }}
        onValuesChange={Validate}
        validateStatus={[0, 0, 0, 0, validatePrice, 0, validatePosition, 0, 0]}
        disabledPrimaryButton={
          validatePosition === "success" &&
          validatePrice === "success" &&
          lastPosition !== "error"
            ? false
            : true
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        beforeUpload={beforeUpload}
        fields={fieldsFormNewProduct}
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={form}
        width={600}
        rulesImage
        listFile
      />
    </Fragment>
  );
};

export default TNewProduct;
