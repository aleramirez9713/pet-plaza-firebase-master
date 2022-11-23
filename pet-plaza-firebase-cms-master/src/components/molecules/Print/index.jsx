import React, { useState } from "react";
import { Button, Icon } from "../../atoms";
import * as jsPDF from "jspdf";

const Print = ({ printDoc, visiblePrint }) => {
  const [doc, setdoc] = useState("");
  let isCtrl = false;
  
  const PrintDoc = (order) => {
    let img = new Image();
    img.src = order.header.img;
    let doc = new jsPDF();
    doc.addImage(img, "PNG", 10, 10, 50, 27);
    doc.setFontSize(25);
    doc.text(order.header.title, 60, 20);
    doc.setFontSize(10);
    let row = 27;
    for (let i in order.header.descriptions) {
      doc.text(order.header.descriptions[i], 60, row);
      row = row + 5;
    }
    let col = 15;
    row = row + 18;
    doc.setFontSize(18);
    doc.text(order.content.col1.title, col, row);
    doc.text(order.content.col2.title, 110, row);
    doc.setFontSize(12);
    col = 20;
    row = row + 10;
    let row2 = row;
    for (let i in order.content.col1.content) {
      doc.text(order.content.col1.content[i], col, row);
      row = row + 12;
    }
    for (let i in order.content.col2.content) {
      doc.text(order.content.col2.content[i], 120, row2);
      row2 = row2 + 12;
    }
    doc.setFontSize(18);
    row = (row > row2 ? row : row2) + 15;
    col = 15;
    doc.text(order.content.list.title, col, row);
    doc.setFontSize(10);
    row = row + 7;
    for (let colH in order.content.list.header) {
      doc.text(order.content.list.header[colH], col, row);
      col = col + 40;
    }
    row = row + 3;
    doc.line(10, row, 150, row);
    doc.setLineWidth(0.5);
    col = 10;
    row = row + 5;
    for (let rowC in order.content.list.data) {
      for (let index in order.content.list.data[rowC]) {
        for (let colH in order.content.list.header) {
          if (order.content.list.header[colH] === index) {
            doc.text(order.content.list.data[rowC][index], col, row);
            col = col + (colH === "1" ? 45 : 40);
          }
        }
      }
      row = row + 5;
      col = 10;
    }
    row = row - 2;
    doc.line(10, row, 150, row);
    row = row + 5;
    for (let i in order.content.list.footer) {
      doc.text(order.content.list.footer[i], col, row);
      row = row + 5;
    }
    doc.setLineWidth(0.5);
    row = row + 15;
    doc.line(10, row, 200, row);
    doc.setLineWidth(1);
    row = row + 5;
    for (let i in order.footer) {
      doc.text(order.footer[i], col + 5, row);
      row = row + 5;
    }
    doc.autoPrint();
    setdoc(
      <iframe
        title="Pdf"
        style={{ display: "none" }}
        src={doc.output("datauristring")}
      ></iframe>
    )
  };
  
  document.onkeyup = (e) => {
    if(visiblePrint){
      if (e.which === 17) isCtrl = false;
    }
  };
  document.onkeydown = (e) => {
    if (visiblePrint) {
      if (e.which === 17) isCtrl = true;
      if (e.which === 80 && isCtrl === true) {
        PrintDoc(printDoc);
        return false;
      }
    }
  };
  return (
    <div>
      <Button type="link" onClick={() => PrintDoc(printDoc)}>
        <Icon name="PrinterOutlined" style={{ fontSize: 25,color: "black" }} />
      </Button>
      {doc}
    </div>
  );
};

export default Print;
