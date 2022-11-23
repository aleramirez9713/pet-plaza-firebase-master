import React from "react";
import { Modal, Descriptions, Card, Row, Col, Spin } from "../../../atoms";
import { constructDescription } from "../../../../hooks";
import { CardList, Print } from "../../../molecules";
import "./style.css";

const ModalInfo = (props) => {
  let cards = [];

  for (let key in props.cards) {
    let description = constructDescription(props.cards[key].item);
    cards.push({
      element: (
        <Card title={props.cards[key].label}>
          <div className="scroll-card">
            <Descriptions
              layout="vertical"
              column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 }}
            >
              {description.map((desc) => desc.element)}
            </Descriptions>
          </div>
        </Card>
      ),
    });
  }

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
      width={900}
      centered
    >
      <Spin spinning={props.loading}>
        <Row>
          {props.print && !props.loading ? (
            <Col span={24}>
              <Print visiblePrint={props.visiblePrint} printDoc={props.print} />
            </Col>
          ) : null}
          {props.extra ? <Col span={24}>{props.extra}</Col> : null}
          <Col span={24} className="content-description-modal">
            {props.descriptions.map((description, j) => (
              <table key={j}>
                <tbody>
                  {description.map((item, i) => (
                    <tr key={i}>
                      <td className="cell">
                        <p className="label-cell">{item.label + ":"}</p>
                        <p>{item.item}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </Col>
          <Col
            lg={{ span: 12 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            className="size-cards"
          >
            <CardList list={props.list} />
          </Col>
          {cards.map((card, i) => (
            <Col
              key={i}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className="size-cards"
            >
              {card.element}
            </Col>
          ))}
        </Row>
      </Spin>
    </Modal>
  );
};

export default ModalInfo;
