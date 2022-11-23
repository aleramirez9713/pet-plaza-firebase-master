import axios from "axios";
import { functionsURL } from "../../Firebase/conection";

export const verifyAuthentication = async (idToken) => {
  try {
    let { data } = await axios.post(`${functionsURL}/verifyAuthCollaborator`, {
      idToken,
    });
    return data;
  } catch (error) {
    return error.message;
  }
};

export const manageTokenOneSignal = async (idToken, id, log) => {
  let res = {};
  try {
    let { data } = await axios.post(`${functionsURL}/manageTokenOneSignal`, {
      idToken,
      id,
      log,
    });
    res = data;
  } catch (error) {
    res = { ...res, error: error.message };
  }
  return res;
};
