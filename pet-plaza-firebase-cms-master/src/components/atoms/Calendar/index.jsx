import React from "react";
import { Calendar } from "antd";
import { localCalendar } from "../../../consts";
import moment from "moment";
import "moment/locale/es-us";
moment.locale("es-us");

const Calendars = ({getListData, getMonthData, ...rest}) => {
  const dateCellRender = (value) => {
    const listData = getListData ? getListData(value) : undefined;
    return (
      <ul>
        {listData.map((item, i) => (
          <div key={i}>
            {item.content}
          </div>
        ))}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    const num = getMonthData ? getMonthData(value) : undefined;
    return num ? (
      num
    ) : null;
  };
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      locale={localCalendar}
      {...rest}
    />
  );
};

export default Calendars;
