import {
  formatDate,
  formatterHNL,
  formatterUSD,
  formatCurrency,
  COUNTRIES,
  labelsOfBuyerDescrption,
  labelsOfShippingDescrption,
} from "../../consts";
import {arrayOfDescription} from './arrays'

const buildLine = (text, max) => {
  let maxTemp = max;
  let response = "";
  if (typeof text === "string") {
    for (let i = 0; i < text.length; i++) {
      if (i < max - 1) {
        response = response + text[i];
      } else {
        response = response + text[i] + "\n";
        max = max + maxTemp;
      }
    }
  } else {
    response = "NaN";
  }
  return response;
};

export const ObjOrder = (order, logo) => {
  const data = {
    header: {
      img: logo,
      title: order.invoiceNumber,
      descriptions: [
        "Fecha: " + formatDate(order.date),
        "Estado: " + (order.realized ? "Realizado" : "No realizado"),
        "Moneda: " + order.currency,
        "Método de pago: " + order.paymentMethod,
      ],
    },
    content: {
      col1: {
        title: "Información de comprador:",
        content: [
          "Nombre: " + order.buyer.names,
          "Apellido: " + order.buyer.surnames,
          "Teléfono: " + order.buyer.phone,
          "Correo: " + order.buyer.email,
        ],
      },
      col2: {
        title: "Información de destino:",
        content: [
          "Nombre: " + order.shipping.name,
          "Teléfono: " + order.shipping.phone,
          "Fecha: " + order.shipping.date,
          "Horario: " + (order.shipping.afternoon ? "Vespertino" : "Matutino"),
          "Departamento: " + order.shipping.department,
          "Dirección: " +
            buildLine(
              order.shipping.city +
                " " +
                order.shipping.addressLine1 +
                " " +
                order.shipping.addressLine2,
              31
            ),
        ],
      },
      list: {
        title: "Productos:",
        header: ["Código", "Nombre", "Cálculo", "Total"],
        data: [],
        footer: [
          "Costo de envío: " +
            (order.currency === "USD"
              ? formatterUSD.format(
                  Math.ceil(order.shipping_cost ? order.shipping_cost : 0)
                )
              : formatterHNL.format(
                  Math.ceil(order.shipping_cost ? order.shipping_cost : 0)
                )),
          "Descuento: " + order.discountPCT + "%",
          "Sub total: " +
            (order.currency === "USD"
              ? formatterUSD.format(
                  Math.ceil(order.subtotal ? order.subtotal : 0)
                )
              : formatterHNL.format(
                  Math.ceil(order.subtotal ? order.subtotal : 0)
                )),
          "Total: " +
            (order.currency === "USD"
              ? formatterUSD.format(Math.ceil(order.total ? order.total : 0))
              : formatterHNL.format(Math.ceil(order.total ? order.total : 0))),
        ],
      },
    },
    footer: [
      order.business.name + " " + order.business.department,
      order.business.city + " " + order.business.street,
      order.business.phone,
    ],
  };

  for (let i in order.orderHistory) {
    data.content.list.data.push({
      Código: order.orderHistory[i].code,
      Nombre: order.orderHistory[i].name,
      Cálculo:
        order.orderHistory[i].quantity +
        " X " +
        (order.currency === "USD"
          ? formatterUSD.format(
              Math.ceil(
                order.orderHistory[i].price ? order.orderHistory[i].price : 0
              )
            )
          : formatterHNL.format(
              Math.ceil(
                order.orderHistory[i].price ? order.orderHistory[i].price : 0
              )
            )),
      Total:
        order.currency === "USD"
          ? formatterUSD.format(
              Math.ceil(
                order.orderHistory[i].total ? order.orderHistory[i].total : 0
              )
            )
          : formatterHNL.format(
              Math.ceil(
                order.orderHistory[i].total ? order.orderHistory[i].total : 0
              )
            ),
    });
  }
  return data;
};

export const buildObjOrders = (data, item, country) => {
  if (typeof data !== "object") {
    switch (item) {
      case "total":
      case "subtotal":
      case "shippingCost":
        return {
          field: item,
          data: formatCurrency(
            COUNTRIES[country].currency.smallFormat,
            data ? data : 0
          ),
        };
      case "id":
      case "storeId":
      case "userId":
        return false;
      case "orderType":
        return {
          field: item,
          data: data === "pick" ? "Pick-and-Go" : "Delivery",
        };
      default:
        return { field: item, data: data };
    }
  } else {
    let temp = [];
    switch (item) {
      case "orderId":
        return false;
      case "date":
        const date = new Date(data.milliseconds);
        return {
          field: item,
          data: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        };
      case "buyer":
        for (let i in data) {
          temp.push({ field: i, data: data[i] });
        }
        return {
          field: item,
          data: arrayOfDescription(temp, labelsOfBuyerDescrption),
        };
      case "shipping":
        for (let i in data) {
          temp.push({
            field: i,
            data: data[i],
          });
        }
        return {
          field: item,
          data: arrayOfDescription(temp, labelsOfShippingDescrption),
        };
      case "orderHistory":
        for (let i in data) {
          data[i].content =
            data[i].quantity +
            " X " +
            formatCurrency(
              COUNTRIES[country].currency.smallFormat,
              data[i].price
            ) +
            " = " +
            formatCurrency(
              COUNTRIES[country].currency.smallFormat,
              data[i].quantity * data[i].price
            );
        }
        return { array: data, label: "Lista de Productos" };
      default:
        return { field: item, data: data };
    }
  }
};
