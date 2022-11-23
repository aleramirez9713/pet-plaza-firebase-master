import React, { Fragment, useState, useEffect } from "react";
import { ButtonEdit } from "../../molecules";
import { ModalForm } from "../../organisms";
import {
  fieldsFormEditProduct,
} from "../../../consts";
import { useUser } from "../../../Context";
import {
  updateProductStore,
  getToken,
  getLastPosition,
  getTypesForSelect,
  setStorage,
} from "../../../hooks";
import { message } from "../../atoms";

const TEditProduct = (props) => {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState("success");
  const [validatePrice, setValidatePrice] = useState("");
  const [disabledPrimaryButton, setDisabledPrimaryButton] = useState(false);
  const [typeProduct, settypeProduct] = useState({});

  useEffect(() => {
    const getTypes = async () => {
      let types = await getTypesForSelect();
      for (let i in props.info) {
        for (let j in types) {
          if (i === types[j].value) {
            settypeProduct(types[j].value);
          }
        }
      }
    };
    getTypes();
  }, [props.info]);

  const Validate = async (changedValues) => {
    if (changedValues.position) {
      let lastPosition = await getLastPosition("products");
      if (lastPosition.success) {
        let temp = [];
        for (let i in lastPosition.data) {
          if (
            changedValues.position === lastPosition.data[i] &&
            changedValues.position !== props.info.position
          ) {
            temp.push(1);
          } else {
            temp.push(0);
          }
        }
        if (
          typeof changedValues.position === "object" ||
          props.form.getFieldValue("position") === "" ||
          typeof changedValues.position === "string" ||
          changedValues.position < 1
        ) {
          setValidate("error");
        } else {
          setValidate("success");
        }
        for (let i in temp) {
          if (temp[i] === 1) {
            setValidate("error");
          }
        }
      } else {
        setDisabledPrimaryButton(true);
      }
    }
    if (
      (changedValues.price < 0 ||
        typeof changedValues.price === ("string" || "object")) &&
      changedValues.price !== props.info.position
    ) {
      setValidatePrice("error");
    } else {
      setValidatePrice("success");
    }
    if (changedValues["hidden-true"]) {
      props.form.setFieldsValue({
        "hidden-false": false,
      });
    }
    if (changedValues["hidden-false"]) {
      props.form.setFieldsValue({
        "hidden-true": false,
      });
    }
    if (changedValues["available-true"]) {
      props.form.setFieldsValue({
        "available-false": false,
      });
    }
    if (changedValues["available-false"]) {
      props.form.setFieldsValue({
        "available-true": false,
      });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    for (let field in values) {
      for (let key in props.info) {
        if (field === key) {
          if (values[field] === props.info[key]) {
            delete values[field];
          }
        }
      }
    }
    if (!values.upload) {
      delete values.upload;
    } else {
      values.images = props.info.images;
      let positions = [];
      props.info.images.forEach((element) => {
        positions.push(element.position);
      });
      positions.sort((unNumero, otroNumero) => otroNumero - unNumero);
      for (let i = 0; i < values.upload.length; i++) {
        let response = await setStorage(
          values.upload[i].originFileObj,
          `${typeProduct}/products/${props.info.name}-${props.info.code}/`
        );
        if (response.success) {
          let imageRef = await response.imageRef[0];
          let downloadURL = await imageRef.ref.getDownloadURL();
          values.images.push({
            position: positions[0] + 1,
            url: downloadURL,
          });
        } else {
          message.error("error al subir la(s) imagen(es).");
        }
      }
      delete values.upload;
    }
    if (values["hidden-true"]) {
      values.hidden = true;
    }
    if (values["hidden-false"]) {
      values.hidden = false;
    }
    if (values["available-true"]) {
      values.available = true;
    }
    if (values["available-false"]) {
      values.available = false;
    }
    delete values["hidden-false"];
    delete values["hidden-true"];
    delete values["available-false"];
    delete values["available-true"];
    let err = false;
    let token = await getToken();
    if (!token.success) {
      err = true;
    }
    let response = await updateProductStore(
      token.token,
      values,
      props.id
    );
    if (!response.success) {
      err = true;
    }
    if (!err) {
      message.success(response.message);
    } else {
      message.error(response);
    }
    props.onCancel();
    props.getData(props.id);
    setLoading(false);
  };

  return (
    <Fragment>
      <ButtonEdit onClick={props.onClick} />
      <ModalForm
        title="Editar Producto"
        visible={props.visible}
        onCancel={props.onCancel}
        spinning={loading}
        image={props.image}
        validateStatus={[0, 0, 0, validatePrice, validate, 0, 0, 0, 0]}
        initialValues={props.initialValues}
        onFinish={onFinish}
        onValuesChange={Validate}
        disabledPrimaryButton={
          userInfo.level !== "local"
            ? !disabledPrimaryButton &&
              validate === "success" &&
              validatePrice === "success"
              ? false
              : true
            : disabledPrimaryButton
        }
        fields={fieldsFormEditProduct}
        primaryButton="Guardar"
        defaultButton="Cancelar"
        form={props.form}
        listFile
      />
    </Fragment>
  );
};

export default TEditProduct;
