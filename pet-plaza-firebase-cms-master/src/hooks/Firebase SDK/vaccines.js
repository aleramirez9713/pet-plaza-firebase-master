import { firestoreDB } from "../../Firebase";

export const getVaccines = async () => {
  const vaccines = {data: []};
  try {
    const vaccinesRef = firestoreDB
        .collection("typeVaccines");
    vaccines.snapshot = await vaccinesRef.get();
    vaccines.snapshot.forEach(doc => {
        vaccines.data.push({
            id: doc.id,
            ...doc.data()
        })
    });
    vaccines.success = true;
  } catch (error) {
    vaccines.success = false;
    vaccines.error = "Error al cargar las vacunas";
  }
  return vaccines;
};
