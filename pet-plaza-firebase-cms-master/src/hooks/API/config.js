import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const changeUserInfo = async (idToken, values, role) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/changeUserInfo`,
      {
        idToken,
        values,
        role
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const changeCurrentPassword = async (idToken, passwords) => {
    try {
      let { data } = await axios.post(
        `${functionsURL}/changeCurrentPassword`,
        {
          idToken,
          passwords,
        }
      );
      return data;
    } catch (error) {
      return error.message;
    }
  };