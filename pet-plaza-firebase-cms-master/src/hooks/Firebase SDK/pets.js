import { firestoreDB } from "../../Firebase";

const limitpetsRequest = 10;

export const getPetsByBlock = async (lastRecord, search) => {
  const pets = { data: [] };
  try {
    const petsRef = firestoreDB.collection("pets").orderBy("birthday", "asc");
    const searchRef = search
      ? petsRef.where("caseSearch", "array-contains", search)
      : petsRef;
    const finalRef = lastRecord
      ? searchRef.startAfter(lastRecord).limit(limitpetsRequest)
      : searchRef.limit(limitpetsRequest);
    pets.snapshot = await finalRef.get();
    pets.snapshot.forEach((doc) => {
      pets.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    pets.success = true;
  } catch (error) {
    console.log(error);
    pets.success = false;
    pets.error = error.message;
  }
  return pets;
};

export const getPetsByUser = async (user) => {
  const pets = { data: [] };
  try {
    let temp = [];
    const petsRef = firestoreDB
      .collection("users")
      .doc(user)
      .collection("pets");
    pets.snapshot = await petsRef.get();
    pets.snapshot.forEach((doc) => {
      temp.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    for (const doc of temp) {
      let pet = await (await doc.pet.get()).data();
      pets.data.push({ ...pet, id: doc.pet.id });
    }
    pets.success = true;
  } catch (error) {
    pets.success = false;
    pets.error = error.message;
  }
  return pets;
};

export const getPet = async (id) => {
  const pet = {};
  try {
    const petsRef = firestoreDB.collection("pets").doc(id);
    pet.data = await (await petsRef.get()).data();
    pet.success = true;
  } catch (error) {
    pet.success = false;
    pet.error = error.message;
  }
  return pet;
};

export const getVaccinesByPet = async (id) => {
  const pet = { data: [] };
  try {
    const petsRef = firestoreDB
      .collection("pets")
      .doc(id)
      .collection("vaccines");
    pet.snapshot = await petsRef.get();
    pet.snapshot.forEach((doc) => {
      pet.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    pet.success = true;
  } catch (error) {
    pet.success = false;
    pet.error = error.message;
  }
  return pet;
};
