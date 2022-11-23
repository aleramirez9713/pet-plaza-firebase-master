import React from "react";
import { Card, Image, Meta, Carousel } from "../../atoms";
import "./style.css";

const CardImage = (props) => {
  return (
    <Card
      hoverable
      style={props.style}
      actions={props.actions}
      cover={
        <>
          {typeof props.image === "string" ? (
            <div>
              <Image
                source={props.image}
                className={props.className}
                preview={props.preview}
              />
            </div>
          ) : (
            <div style={{ width: "100%", height: "100%", padding: 20 }}>
              <Carousel
                draggable 
              >
                {props.image.map((image) => (
                  <Image
                    preview={false}
                    key={image.position}
                    source={image.url}
                    className={props.className}
                  />
                ))}
              </Carousel>
            </div>
          )}
        </>
      }
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
};
export default CardImage;
