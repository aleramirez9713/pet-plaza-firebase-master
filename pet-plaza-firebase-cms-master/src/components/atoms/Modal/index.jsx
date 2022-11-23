import React from "react";
import { Modal } from "antd";

export const { confirm, success, error, warning, info } = Modal;
export const destroyAll = () => Modal.destroyAll();

const Modals = ({ children, ...rest }) => {
  return <Modal {...rest}>{children}</Modal>;
};

export default Modals;
