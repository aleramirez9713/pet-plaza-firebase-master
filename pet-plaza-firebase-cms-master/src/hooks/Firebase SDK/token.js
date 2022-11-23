import { firebaseAuthToken } from "../../Firebase";

export const getToken = async () => {
  const token = {};
  try {
    let tokenRef = firebaseAuthToken();
    token.token = await tokenRef;
    token.success = true;
  } catch (error) {
    token.success = false;
    token.error = error.message;
  }
  return token;
};
