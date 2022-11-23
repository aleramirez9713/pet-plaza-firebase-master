import React from "react";
import { Card } from "antd";

const { Meta, Grid } = Card;

export { Meta, Grid };

const Cards = ({ children, ...rest }) => {
  return <Card {...rest}>{children}</Card>;
};
export default Cards;
