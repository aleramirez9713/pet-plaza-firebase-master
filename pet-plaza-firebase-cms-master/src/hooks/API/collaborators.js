import axios from "axios";
import { functionsURL } from "../../Firebase/conection";

export const setCollaborator = async (idToken, values, website, collection) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/setCollaborator`,
      {
        idToken,
        data: values,
        website,
        collection
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const uploadCollaborator = async (idToken, values, id, collection) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/uploadCollaborator`,
      {
        idToken,
        data: values,
        id,
        collection
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const removeCollaborator = async (idToken, id, collection) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/removeCollaborator`,
      {
        idToken,
        id,
        collection
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
