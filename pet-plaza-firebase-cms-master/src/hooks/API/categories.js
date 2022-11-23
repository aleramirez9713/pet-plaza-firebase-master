import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const setTypeStore = async (idToken, type) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/setType`,
      {
        idToken,
        type,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const removeTypeStore = async (idToken, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/removeType`,
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

export const updateTypeStore = async (idToken, type, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/updateType`,
      {
        idToken,
        type,
        id,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const TypeInProducts = async (
  idToken,
  products,
  type,
  action
) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/TypeInProducts`,
      {
        idToken,
        products,
        type,
        action,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
