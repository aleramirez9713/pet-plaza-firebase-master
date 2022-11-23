import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const changeStateOrder = async (idToken, orderId, statusOrder, userId, statusHistory) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/updateStateOrder`,
      {
        idToken,
        orderId,
        statusOrder,
        userId,
        statusHistory,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getAOrder = async (idToken, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/getAOrder`,
      {
        idToken,
        id
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getOrdersByTimeRange = async (idToken, range) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/getOrdersByTimeRange`,
      {
        idToken,
        range
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
