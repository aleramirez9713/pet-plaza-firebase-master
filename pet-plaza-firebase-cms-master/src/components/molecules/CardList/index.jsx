import React from "react";
import { Card, List } from "../../atoms";
import { Avatar } from "../";

const CardList = (props) => {
  return (
    <Card title={props.list.label}>
      <div className="scroll-card">
        <List
          itemLayout="horizontal"
          dataSource={props.list.array}
          renderItem={(item) => (
              <List.Item>
                  <List.Item.Meta
                    avatar={
                      item.images ? (
                        <Avatar src={item.images[0].url} />
                      ) : (
                        <Avatar>{item.name[0]}</Avatar>
                      )
                    }
                    title={item.code +' - '+item.name}
                    description={item.content}
                  />
              </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default CardList;
