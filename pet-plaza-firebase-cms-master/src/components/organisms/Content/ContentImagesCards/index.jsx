import React from "react";
import { Link } from "react-router-dom";
import { NoData } from "../../";
import { Row, Col, InfiniteScroller } from "../../../atoms";
import { CardImage, Loading } from "../../../molecules";
import "./style.css";

const ContentImagesCards = ({
  data,
  to,
  onClick,
  play,
  affix,
  loadMore,
  hasMore,
  loading,
  visible,
  onCancel,
}) => {
  const content =
    data.length > 0 ? (
      <Row>
        {data.map((item, i) => (
          <Col
            key={i}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
            className="border-cards"
          >
            <Link
              to={to ? to + item.id : window.location}
              onClick={onClick ? () => onClick(item.id) : () => {}}
            >
              <CardImage
                image={item.image}
                title={item.title}
                className="pictures-content"
                description={item.description}
                actions={item.actions}
                play={play}
              />
            </Link>
          </Col>
        ))}
      </Row>
    ) : (
      <NoData visible={visible} onCancel={onCancel} />
    );
  
  return (
    <div className="content-page">
      <div className="button-new">{affix}</div>
      <Row className="Scroll-card">
        {loading ? (
          <Loading />
        ) : loadMore ? (
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
      </Row>
    </div>
  );
};

export default ContentImagesCards;
