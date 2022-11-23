import React, { useState } from "react";
import { Forms } from "../../molecules";
import { Grid, Card, Form, Button, Image } from "../../atoms";
import { fieldsFormLogin } from "../../../consts";
import Pets from "../../../media/pets.png";
import { TSendMail } from "../";
import "./style.css";

const TemplateLogin = (props) => {
  const [form] = Form.useForm();
  const [validateUser, setValidateUser] = useState("");
  const [validatePass, setValidatePass] = useState("");
  const [visible, setVisible] = useState(false);

  const Validate = (changedValues) => {
    try {
      changedValues.username
        ? changedValues.username.match(/([a-z]|[0-9])([@])([a-z])/g)
          ? setValidateUser("success")
          : setValidateUser("error")
        : changedValues.password.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/g
          )
        ? setValidatePass("success")
        : setValidatePass("error");
    } catch (error) {
      if (validateUser.length > 0) {
        Review("username")
          ? setValidateUser("")
          : setValidateUser(validateUser);
      }
      if (validatePass.length > 0) {
        Review("password")
          ? setValidatePass("")
          : setValidatePass(validateUser);
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

  return (
    <Card>
      <Grid className="Form-log">
        <div className="Icon-log">
          <Image preview={false} source={Pets} className="logo-pet" />
        </div>
        <Forms
          onFinish={props.onFinish}
          onFinishFailed={props.onFinishFailed}
          onValuesChange={Validate}
          validateStatus={[validateUser, validatePass]}
          disabledPrimaryButton={
            validatePass === "success" && validateUser === "success"
              ? false
              : true
          }
          fields={fieldsFormLogin}
          primaryButton="Entrar"
          form={form}
        />
        <Button type="link" onClick={() => setVisible(true)}>
          ¿Olvidaste tu contraseña?
        </Button>
        <TSendMail visible={visible} onCancel={() => setVisible(false)} />
      </Grid>
    </Card>
  );
};

export default TemplateLogin;
