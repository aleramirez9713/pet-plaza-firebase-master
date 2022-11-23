import axios from "axios";
import { functionsURL } from "../../Firebase/conection";

export const setStore = async (idToken, store) => {
    try {
      let { data } = await axios.post(`${functionsURL}/setStore`, {
        idToken,
        store,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  };
  
  export const updateStore = async (idToken, store, id) => {
    try {
      let { data } = await axios.post(`${functionsURL}/updateStore`, {
        idToken,
        store,
        id,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  };
  
  export const removeStore = async (idToken, id) => {
    try {
      let { data } = await axios.post(`${functionsURL}/removeStore`, {
        idToken,
        id,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  };