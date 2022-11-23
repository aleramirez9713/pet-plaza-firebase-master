import { firestoreDB } from "../../Firebase";

export const getLastPosition = async (collection) => {
    const position = { data: [] };
    try {
      let positionRef = firestoreDB
        .collection(collection);
      position.snapshot = await positionRef.get();
      position.snapshot.forEach((doc) => {
        if (doc.data().position) {
          position.data.push(doc.data().position);
        }
      });
      position.data.sort((unNumero, otroNumero) => otroNumero - unNumero);
      position.success = true;
      return position;
    } catch (error) {
      position.success = false;
      position.error = error.message;
      return position;
    }
  };