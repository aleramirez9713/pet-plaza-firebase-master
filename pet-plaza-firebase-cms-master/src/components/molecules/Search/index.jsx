import React from "react";
import { Input, Tooltip } from "../../atoms";

const { Search } = Input;

const Searchs = ({ placeholderExtra, style, ...rest }) => {
  return (
    <Tooltip
      title={`Buscar ${placeholderExtra ? placeholderExtra : ""}`}
      placement="top"
    >
      <Search
        name="search"
        placeholder={`Buscar ${
          placeholderExtra ? placeholderExtra : ""
        }`}
        style={style ? style : { width: 200 }}
        {...rest}
      />
    </Tooltip>
  );
};

export default Searchs;
