import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const getAllUsers = async (idToken) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/getAllUsers`,
      {
        idToken,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};