import React, { useState, useEffect, Fragment } from "react";
import { Card, Grid, Form, message, Alert, Button } from "../../atoms";
import { Forms, Loading } from "../../molecules";
import { verifyTokenUser, changePassword } from "../../../hooks";
import { fieldsFormRecoveryPassword } from "../../../consts";
import { useParams, Redirect, Link } from "react-router-dom";
import { NoData } from "../../organisms";
import "./style.css";

const RecoveryPassword = () => {
  const { metadata, user } = useParams();
  const [form] = Form.useForm();
  const [firstPassword, setfirstPassword] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [loading, setloading] = useState(false);
  const [notFound, setnotFound] = useState(true);
  const [err, seterr] = useState(false);
  const [redirect, setredirect] = useState(false);

  const verifyToken = async (user) => {
    setloading(true);
    let response = await verifyTokenUser(user);
    if (response.success) {
      setnotFound(false);
    } else {
      setnotFound(true);
    }
    setloading(false);
  };

  useEffect(() => {
    verifyToken(user);
  }, [user]);

  const Validate = (changedValues, values) => {
    if (values["first-password"] === values.password) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
    try {
      changedValues["first-password"]
        ? changedValues["first-password"].match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/g
          )
          ? setfirstPassword("success")
          : setfirstPassword("error")
        : changedValues.password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/g
          )
        ? setpassword("success")
        : setpassword("error");
    } catch (error) {
      if (firstPassword.length > 0) {
        Review("first-password")
          ? setfirstPassword("")
          : setfirstPassword(firstPassword);
      }
      if (password.length > 0) {
        Review("password") ? setpassword("") : setpassword(password);
      }
    }
  };

  const Review = (field) => {
    if (form.getFieldValue(field).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onFinish = async (values) => {
    setloading(true);
    let response = await changePassword(metadata, values.password, user);
    if (response.success) {
      message.success(response.message);
      setredirect(true);
    } else {
      seterr(true);
    }
    setloading(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : notFound ? (
        <Fragment>
          <NoData notFound />
        </Fragment>
      ) : err ? (
        <Alert
          message="Error al crear una contraseña"
          description={
            <div className="alert-message">
              <span>
                Este error se puede solucionar actualizando la pagina, si es
                asi; siga uno de los siguientes casos:
              </span>
              <ul>
                <li>
                  Si usted es un usuario nuevo sin contraseña, ingrese al login
                  de la pagina, y empiece el proceso de renovación de contraseña
                  en la opción "¿Olvidaste tu contraseña?"
                </li>
                <li>
                  Si usted es un usuario que esta renovando su contraseña,
                  reinicie el proceso otra vez
                </li>
              </ul>
              <Link to="/p/login">ir al login</Link>
              <Button type="link" onClick={() => document.location.reload()}>
                Actualizar
              </Button>
            </div>
          }
          type="error"
        />
      ) : redirect ? (
        <Redirect to="/login" />
      ) : (
        <Card>
          <Grid className="card-recovery-password">
            <div>
              <h2>Nueva contraseña:</h2>
              <p>
                Crea una nueva contraseña para poder tener acceso a Pronto Admin
              </p>
              {disabled &&
              firstPassword === "success" &&
              password === "success" ? (
                <span style={{ color: "red" }}>
                  * Las contraseñas cumplen con los requisitos para una
                  contraseña en Pronto Admin, pero no son iguales
                </span>
              ) : null}
              {firstPassword === "error" || password === "error" ? (
                <div>
                  <p style={{ color: "red" }}>
                    * La contraseña debe tener minimo 6 carácteres, tener una
                    mayúscula, un número y un carácter especial (#?!@$%^&*-_).
                  </p>
                  <p>
                  * Habilite el ojó para poder visualizar su contraseña.
                </p>
                </div>
              ) : null}
            </div>
            <Forms
              onFinish={onFinish}
              onValuesChange={Validate}
              validateStatus={[firstPassword, password]}
              disabledPrimaryButton={
                firstPassword === "success" &&
                password === "success" &&
                !disabled
                  ? false
                  : true
              }
              fields={fieldsFormRecoveryPassword}
              primaryButton="Actualizar"
              form={form}
            />
          </Grid>
        </Card>
      )}
    </Fragment>
  );
};

export default RecoveryPassword;
