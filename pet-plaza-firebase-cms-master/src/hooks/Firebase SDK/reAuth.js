import { firebaseAppAuth } from "../../Firebase";

export const reAuth = async (email, password) => {
  try {
    const veredict = await firebaseAppAuth(email, password);
    if (veredict.user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
