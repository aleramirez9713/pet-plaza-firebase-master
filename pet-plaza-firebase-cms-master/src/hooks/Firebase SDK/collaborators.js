import { firestoreDB } from "../../Firebase";

export const getCollaborators = async (currentUser) => {
  const collaborators = { data: [] };
  try {
    let collaboratorsRef = firestoreDB.collection("collaborators");
    collaborators.snapshot = await collaboratorsRef.get();
    collaborators.snapshot.forEach((doc) => {
      collaborators.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    for (let i in collaborators.data) {
      let user = await (
        await firestoreDB
          .collection("users")
          .doc(collaborators.data[i].id)
          .get()
      ).data();
      let role = await collaborators.data[i].role.get();
      collaborators.data[i].email = user ? user.email : "No disponible";
      collaborators.data[i].phone = user ? user.phone : "No disponible";
      collaborators.data[i].role = collaborators.data[i].role
        ? { ...role.data(), id: role.id }
        : {};
    }
    collaborators.data = collaborators.data.filter(e => e.id !== currentUser)
    collaborators.success = true;
  } catch (error) {
    collaborators.error = error.message;
    collaborators.success = false;
  }
  return collaborators;
};

export const getVets = async () => {
  const collaborators = { data: [] };
  try {
    const collaboratorsRef = firestoreDB
    .collection("vets")
    collaborators.snapshot = await collaboratorsRef.get();
    collaborators.snapshot.forEach((doc) => {
      collaborators.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    for (let i in collaborators.data) {
      let user = await (
        await firestoreDB
          .collection("users")
          .doc(collaborators.data[i].id)
          .get()
      ).data();
      collaborators.data[i].email = user ? user.email : "No disponible";
      collaborators.data[i].phone = user ? user.phone : "No disponible";
    }
    collaborators.success = true;
  } catch (error) {
    collaborators.error = error.message;
    collaborators.success = false;
  }
  return collaborators;
};

export const getVet = async (id) => {
  let collaborators = {};
  try {
    const collaboratorsRef = firestoreDB
    .collection("vets")
    .doc(id)
    collaborators = await (await collaboratorsRef.get()).data();
    collaborators = {
      ...collaborators,
      id: id
    }
  } catch (error) {
    collaborators = {}
  }
  return collaborators;
};
