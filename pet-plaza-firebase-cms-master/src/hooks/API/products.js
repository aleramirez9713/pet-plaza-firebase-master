import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const setProductStore = async (idToken, product) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/createProduct`,
      {
        idToken,
        product,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const updateProductStore = async (idToken, product, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/updateProduct`,
      {
        idToken,
        product,
        id,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const removeProductStore = async (idToken, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/removeProduct`,
      {
        idToken,
        id,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
