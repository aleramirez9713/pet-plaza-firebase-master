import { firestoreDB } from "../../Firebase";

export const setUserId = async (uid, id) => {
  try {
    const ref = firestoreDB
      .collection("collaborators")
      .doc(uid)
      .collection("oneSignal");
    let filter = await ref.where("id", "==", id).get();
    if (filter.empty) {
      await ref.add({ id });
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const removeUserId = async (uid, id) => {
  try {
    const ref = firestoreDB
      .collection("collaborators")
      .doc(uid)
      .collection("oneSignal");
    let filter = ref.where("id", "==", id);
    let data = await filter.get();
    data.forEach(async (doc) => {
      console.log(doc.id);
      await ref.doc(doc.id).delete();
    });
    return true;
  } catch (error) {
    return false;
  }
};
