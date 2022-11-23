import { firestoreDB } from "../../Firebase";

export const getSpecilities = async () => {
  const speciality = { data: [] };
  try {
    const specialityRef = firestoreDB
      .collection("speciality")
      .orderBy("speciality", "asc");
    speciality.snapshot = await specialityRef.get();
    speciality.snapshot.forEach((doc) => {
      speciality.data.push({
        value: doc.data().speciality,
        text: doc.data().speciality,
        id: doc.id,
      });
    });
  } catch (error) {
    speciality.data = [];
  }
  return speciality.data;
};

export const setSpecilities = async (speciality) => {
  try {
    const specialityRef = firestoreDB.collection("speciality");
    specialityRef.add({ speciality });
    return true
  } catch (error) {
    return false
  }
};

export const deleteSpecilities = async (specialities) => {
  try {
    const specialityRef = firestoreDB.collection("speciality");
    for (const id of specialities) {
      await specialityRef.doc(id).delete()
    }
    return true
  } catch (error) {
    return false
  }
};
