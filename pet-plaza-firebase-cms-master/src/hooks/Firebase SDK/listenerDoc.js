import { firestoreDB } from "../../Firebase";

export const listenerDoc = async (collection, callback) => {
    try {
      const ref = firestoreDB.collection(collection);
      ref.onSnapshot((e)=> callback(e))
    } catch (error) {
      return false;
    }
  };