import React, { Fragment } from "react";
import { Col } from '../../../atoms';
import "./style.css";
import { CardImage, CardInfo } from '../../../molecules';

const ContentDetailsCards = ({ cardImage, cardInfo }) => {
  return (
    <Fragment>
      {cardImage ? (
        <Col
          xs={{ span: cardImage.span.xs ? cardImage.span.xs : 24 }}
          sm={{ span: cardImage.span.sm ? cardImage.span.sm : 24 }}
          md={{ span: cardImage.span.md ? cardImage.span.md : 12 }}
          lg={{ span: cardImage.span.lg ? cardImage.span.lg : 12 }}
          className={cardImage.className ? cardImage.className :"padding-image"}
        >
          <CardImage
            className="image-cardImage"
            style={{
              width: 500,
            }}
            image={cardImage.image}
            title={cardImage.title}
            description={cardImage.description}
            onClick={cardImage.onClick}
          />
        </Col>
      ) : null}
      <Col
        xs={{ span: cardInfo.span.xs ? cardInfo.span.xs : 24 }}
        sm={{ span: cardInfo.span.sm ? cardInfo.span.sm : 24 }}
        md={{ span: cardInfo.span.md ? cardInfo.span.md : 12 }}
        lg={{ span: cardInfo.span.lg ? cardInfo.span.lg : 12 }}
        className={cardInfo.className ? cardInfo.className :"info-content"}
      >
        <CardInfo
          title={cardInfo.title}
          info={cardInfo.info}
          actions={cardInfo.actions}
          width={cardInfo.width}
        />
      </Col>
    </Fragment>
  );
};

export default ContentDetailsCards;
