import React from "react";
import { Icon, Button, Space } from "../../atoms";

const DownLoadButton = ({ onClick, type="primary", loading, text, round,...rest }) => {
  return (
    <Button
      type={type}
      shape={round? undefined :"round"}
      size={round? undefined :"large"}
      onClick={onClick}
      loading={loading}
      {...rest}
    >
      {loading ? (
        ""
      ) : (
        <Space>
          <Icon name="DownloadOutlined" style={{ fontSize: 20 }} />
          {text}
        </Space>
      )}
    </Button>
  );
};

export default DownLoadButton;
