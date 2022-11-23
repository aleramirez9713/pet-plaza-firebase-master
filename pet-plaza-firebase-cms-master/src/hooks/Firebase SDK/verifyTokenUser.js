import { firestoreDB } from "../../Firebase";

export const verifyTokenUser = async (uid) => {
  const veredict = {};
  try {
    const userRef = firestoreDB.collection("collaborators").doc(uid);

    veredict.preSnapshot = await userRef.get();
    if (veredict.preSnapshot.exists) {
      veredict.snapshot = veredict.preSnapshot.data();
      if (veredict.snapshot.update) {
        veredict.success = true;
      } else {
        veredict.success = false;
      }
    } else {
      const userRef = firestoreDB.collection("vets").doc(uid);

      veredict.preSnapshotVets = await userRef.get();
      if (veredict.preSnapshotVets.exists) {
        veredict.snapshot = veredict.preSnapshotVets.data();
        if (veredict.snapshot.update) {
          veredict.success = true;
        } else {
          veredict.success = false;
        }
      } else {
        veredict.success = false;
      }
    }
  } catch (error) {
    veredict.success = false;
  }
  return veredict;
};
