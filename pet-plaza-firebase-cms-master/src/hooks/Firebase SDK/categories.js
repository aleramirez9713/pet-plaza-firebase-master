import { firestoreDB } from "../../Firebase";

export const getTypesForSelect = async (type) => {
  const types = { data: [] };
  try {
    let typesRef = firestoreDB
      .collection("types")
      .where("type","==",type)
      .orderBy("position", "asc");
    types.snapshot = await typesRef.get();
    types.snapshot.forEach((doc) => {
      types.data.push({ value: doc.id, text: doc.data().name });
    });
  } catch (error) {
    types.data = [];
  }
  return types.data;
};

export const getTypes = async (type) => {
  const types = { data: [] };
  try {
    let typesRef = firestoreDB
      .collection("types")
      .where("type","==",type)
      .orderBy("position", "asc");
    types.snapshot = await typesRef.get();
    types.snapshot.forEach((doc) => {
      types.data.push({ id: doc.id, ...doc.data() });
    });
    types.success = true;
  } catch (error) {
    types.success = false;
    types.error = error.message;
  }
  return types;
};

export const getOneCategory = async (id) => {
  const category = {};
  try {
    let categoryRef = firestoreDB
      .collection("types")
      .doc(id);
    category.snapshot = await categoryRef.get();
    if (!category.snapshot.data()) {
      category.success = false;
      return category;
    }
    category.data = category.snapshot.data();
    category.success = true;
  } catch (error) {
    category.success = false;
    category.error = error.message;
  }
  return category;
};