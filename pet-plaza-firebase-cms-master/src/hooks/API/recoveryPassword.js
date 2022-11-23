import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const recoveryPassword = async (idToken, email, website) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/recoveryPassword`,
      {
        idToken,
        data: email,
        website,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const changePassword = async (metadata, newPassword, user) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/changePassword`,
      {
        metadata,
        newPassword,
        user,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
