import React from "react";
import { Modal, Row, Col, Table, Button, Tabs, TabPane } from "../../../atoms";
import { Search } from "../../../molecules";
import "./style.css";

const ModalTable = ({
  title,
  visible,
  onCancel,
  onChange,
  placeholderExtra,
  rowSelection,
  columns,
  loading,
  dataSource,
  onClick,
  danger,
  textButton,
  width = 1200,
  extra,
  hiddenSearch,
  onChangeTabs,
  tabs,
  activeKey,
}) => {
  const Content = () => (
    <Row>
      <Col span={24} className="search-section">
        {hiddenSearch ? (
          <div />
        ) : (
          <Search onChange={onChange} placeholderExtra={placeholderExtra} />
        )}
        {extra ? (
          extra.length > 0 ? (
            extra.filter(e => e && e.key === activeKey)[0]?.component
          ) : (
            extra
          )
        ) : (
          <div />
        )}
      </Col>
      <Col span={24}>
        <Table
          rowSelection={rowSelection}
          columns={tabs ? columns.filter(e => e.key === activeKey)[0].columns : columns}
          scroll={{ x: true }}
          loading={loading}
          dataSource={tabs ? dataSource.filter(e => e.key === activeKey)[0]?.data : dataSource}
          size="middle"
          footer={
            onClick
              ? () => (
                  <Col span={24} className="button-add">
                    <Button type="primary" onClick={onClick} danger={danger}>
                      {textButton}
                    </Button>
                  </Col>
                )
              : null
          }
        />
      </Col>
    </Row>
  );

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      width={width}
      footer={null}
    >
      {tabs ? (
        <Tabs
          onChange={(e) => onChangeTabs(e)}
          activeKey={activeKey}
          type="card"
        >
          {tabs.map((pane) => (
            <TabPane tab={pane.label} key={pane.key}>
              <Content />
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <Content />
      )}
    </Modal>
  );
};

export default ModalTable;
