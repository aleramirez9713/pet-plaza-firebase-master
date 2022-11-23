import React from "react";
import { Descriptions } from "../../components/atoms";

export const constructDescription = (data) => {
    let temp = [];
    for (let key in data) {
      temp.push({
        element: (
          <Descriptions.Item
            key={key}
            label={data[key].label}
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            <div
              style={{ textAlign: "center", fontWeight: "normal", fontSize: 14, width: 150 }}
            >
              {data[key].item}
            </div>
          </Descriptions.Item>
        ),
        importance: data.importance,
      });
    }
    return temp;
  };