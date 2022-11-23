import axios from "axios";
import { functionsURL } from "../../Firebase/conection";


export const getPetsList = async (idToken) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/getPetsList`,
      {
        idToken,
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const addVaccinesPet = async (idToken, petId, vaccine) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/addVaccinesPet`,
      {
        idToken,
        petId,
        vaccine
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};

export const appliedVaccineToPet = async (idToken, petId, vaccine, date) => {
  try {
    let { data } = await axios.post(
      `${functionsURL}/appliedVaccineToPet`,
      {
        idToken,
        petId,
        vaccine,
        date
      }
    );
    return data;
  } catch (error) {
    return error.message;
  }
};