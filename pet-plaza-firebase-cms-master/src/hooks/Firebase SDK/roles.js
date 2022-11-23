import { firestoreDB } from "../../Firebase";

export const getRoles = async () => {
  const roles = { data: [] };
  try {
    let rolesRef = firestoreDB.collection("roles");
    roles.snapshot = await rolesRef.get();
    roles.snapshot.forEach((doc) => {
        roles.data.push(doc.data().slug)
    });
  } catch (error) {
    roles.data=[]
  }
  return roles.data;
};

export const getRolesForSelect = async () => {
  const roles = { data: [] };
  try {
    let rolesRef = firestoreDB.collection("roles");
    roles.snapshot = await rolesRef.get();
    roles.snapshot.forEach((doc) => {
        roles.data.push({text:doc.data().role,value:doc.id})
    });
  } catch (error) {
    roles.data=[]
  }
  return roles.data;
};
