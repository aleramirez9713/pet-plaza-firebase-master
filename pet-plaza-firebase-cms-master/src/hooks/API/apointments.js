import axios from "axios";
import { functionsURL } from "../../Firebase/conection";

export const generateQuotas = async (idToken, vetId, date, numPets) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/generateQuotas`,
      {
        idToken,
        vetId,
        date,
        numPets
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const makeApointment = async (idToken, apointment) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/makeApointment`,
      {
        idToken,
        apointment
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const updateApointment = async (idToken, id, apointment) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/updateApointment`,
      {
        idToken,
        id,
        apointment
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const updateTypeApointment = async (idToken, id, typeApoinment) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/updateTypeApoinment`,
      {
        idToken,
        id,
        typeApoinment
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const setTypeApointment = async (idToken, typeApoinment) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/setTypeApoinment`,
      {
        idToken,
        typeApoinment
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const removeTypeApointment = async (idToken, id) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/removeTypeApoinment`,
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

