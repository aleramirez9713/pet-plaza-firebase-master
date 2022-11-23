import React, { useState } from "react";
import { Pagination } from "antd";
import {Button, Icon} from "../../atoms";

const Paginations = ({ total, eventNext }) => {
  const [current, setcurrent] = useState(1);

  const itemRender=(current, type, originalElement)=> {
    if (type === 'prev') {
      return <Button onClick={()=>setcurrent(e => e - 1)}>
        <Icon name="LeftOutlined" />
        Previous
        </Button>;
    }
    if (type === 'next') {
      return <Button onClick={eventNext ? eventNext :()=>setcurrent(e => e + 1)}>
        Next
        <Icon name="RightOutlined" />
        </Button>;
    }
    return originalElement;
  }

  return (
    <Pagination
      current={current}
      total={total+1}
      onChange={(e) => setcurrent(e)}
      showSizeChanger={false}
      pageSize={10}
      itemRender={itemRender}
    />
  );
};

export default Paginations;
