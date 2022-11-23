import React from "react";
import { firebaseAppAuth } from "../../../Firebase";
import { TLogin } from "../../templates";
import { message } from "../../atoms";

const Login = () => {
  const onFinish = async (values) => {
    try {
      await firebaseAppAuth(values.username, values.password);
    } catch (error) {
      onFinishFailed("Usuario no valido");
    }
  };

  const onFinishFailed = (text) => {
    message.error(text);
  };
  return <TLogin onFinish={onFinish} onFinishFailed={onFinishFailed} />;
};

export default Login;
