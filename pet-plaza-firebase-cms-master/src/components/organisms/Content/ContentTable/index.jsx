import React, { useState, useEffect } from "react";
import { Table, Col, InfiniteScroller, Button, Icon } from "../../../atoms";
import { Loading } from "../../../molecules";
import "./style.css";

const ContentTable = ({
  Affix,
  search,
  columns,
  data,
  loading,
  loadMore,
  hasMore,
  infinite,
  orders,
  ...rest
}) => {
  const [current, setcurrent] = useState(1);
  const [update, setupdate] = useState(false);

  useEffect(() => {
    if (data.length/10 === 1) {
      setcurrent(1)
    }
  }, [data])

  useEffect(() => {
    if (update) {
      if (data.length/10 < 1 ? false : current > data.length/10) {
        if (loadMore) {
          loadMore();
          setupdate(false);
        }
      }
    }
  }, [current, data, loadMore, update])

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button onClick={() => {
          setcurrent((e) => e - 1)
          setupdate(true)
          }}>
          <Icon name="LeftOutlined" />
          Previous
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button
          onClick={()=>{
            setcurrent(e => e + 1)
            setupdate(true)
          }}
          disabled = {true}
        >
          Next
          <Icon name="RightOutlined" />
        </Button>
      );
    }
    return originalElement;
  };

  const config = {
    position: ["bottomCenter", "topCenter"],
    current: current,
    total: loadMore ? data.length + 1 : data.length,
    onChange: (page)=>setcurrent(page),
    showSizeChanger: false,
    pageSize: 10,
    itemRender: itemRender,
    size: "default"
  };

  const content = (
    <Table
      scroll={{ x: true }}
      loading={loading}
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={config}
      {...rest}
    />
  );
  return (
    <div className="content-table-page">
      {!orders && <div className="button-new-table">
        {search ? search : <div />}
        {Affix}
      </div>}
      <Col span={24} className="Scroll-table">
        {loadMore && infinite ? (
          <InfiniteScroller
            initialLoad={false}
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            useWindow={false}
            loader={<Loading key={0} />}
          >
            {content}
          </InfiniteScroller>
        ) : (
          content
        )}
      </Col>
    </div>
  );
};

export default ContentTable;
