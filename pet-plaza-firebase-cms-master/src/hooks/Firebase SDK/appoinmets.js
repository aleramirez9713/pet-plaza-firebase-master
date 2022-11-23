import { firestoreDB } from "../../Firebase";
import { getVet } from "./collaborators";

export const getappointmentsByVet = async (uid, date) => {
  const appointments = { data: [] };
  try {
    const appointmentRef = firestoreDB
      .collection("apointments")
      .where("vetId", "==", uid)
      .orderBy("hour", "asc");
    const finalRef = date
      ? appointmentRef.where("date", "==", date)
      : appointmentRef
    appointments.snapshot = await finalRef.get();
    appointments.snapshot.forEach((doc) => {
      appointments.data.push({ id: doc.id, ...doc.data() });
    });
    appointments.success = true;
  } catch (error) {
    appointments.success = false;
  }
  return appointments;
};


const limitApointment = 10

export const getAppointments = async (lastRecord, search, date, vet, petId) => {
  const appointments = { data: [] };
  try {
    const appointmentRef = firestoreDB
      .collection("apointments")
      .orderBy("createDate", "desc");
    const petsRef = petId
      ? appointmentRef.where("petsId", "array-contains", petId)
      : appointmentRef
    const vetRef = vet
      ? petsRef.where("vetId","==",vet)
      : petsRef
    const dateRef = date
      ? vetRef.where("date","==",date)
      : vetRef
    const searchRef = search
      ? dateRef.where("user.caseSearch", "array-contains", search)
      :dateRef;
    const final = lastRecord
      ? searchRef.startAfter(lastRecord).limit(limitApointment)
      : searchRef.limit(limitApointment);
    appointments.snapshot = await final.get();
    appointments.snapshot.forEach((doc) => {
      appointments.data.push({ ...doc.data() });
    });

    for (const doc of appointments.data) {
      let vet = await getVet(doc.vetId);
      doc.vet = vet.fullName
    }
    appointments.success = true;
  } catch (error) {
    appointments.success = false;
  }
  return appointments;
};

export const getTypesAppointments = async () => {
  const appointments = { types: [] };
  try {
    const appointmentRef = firestoreDB
      .collection("typeApointments");
    appointments.snapshot = await appointmentRef.get();
    appointments.snapshot.forEach((doc) => {
      appointments.types.push({ id: doc.id, ...doc.data() });
    });
    appointments.success = true;
  } catch (error) {
    appointments.success = false;
  }
  return appointments;
};