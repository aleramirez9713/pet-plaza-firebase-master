import React from "react";
import { Select, Option } from "../../atoms";

const DinamicSelect = ({ options, ...rest }) => {
  return (
    <Select {...rest}>
      {options.map((option, i) => (
        <Option key={i} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
};

export default DinamicSelect;
