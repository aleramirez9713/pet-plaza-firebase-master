import { firestoreDB } from "../../Firebase";

export const getStoresForSelect = async () => {
  const stores = { data: [] };
  try {
    let storesRef = firestoreDB.collection("stores");
    stores.snapshot = await storesRef.get();
    stores.snapshot.forEach((doc) => {
      stores.data.push({ text: doc.data().name, value: doc.id });
    });
  } catch (error) {
    stores.data = [];
  }
  return stores.data;
};

export const getStoresForSelectVets = async () => {
  const stores = { data: [] };
  try {
    let storesRef = firestoreDB.collection("stores");
    stores.snapshot = await storesRef.get();
    stores.snapshot.forEach((doc) => {
      let value=JSON.stringify({id: doc.id, name: doc.data().name, address: doc.data().address })
      stores.data.push({ label: doc.data().name, value});
    });
  } catch (error) {
    stores.data = [];
  }
  return stores.data;
};

const limitStoresRequest = 10;
export const getStores = async (lastRecord, textSearch) => {
  const stores = { data: [] };
  try {
    const storesRef = firestoreDB
      .collection("stores")
      .orderBy("name", "asc");
    const searchRef = textSearch
      ? storesRef.where("caseSearch", "array-contains", textSearch)
      : storesRef;
    const finalRef = lastRecord
      ? searchRef.startAfter(lastRecord).limit(limitStoresRequest)
      : searchRef.limit(limitStoresRequest);
    stores.snapshot = await finalRef.get();
    stores.snapshot.forEach((doc) => {
      stores.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    stores.success = true;
  } catch (error) {
    stores.error = error.message;
    stores.success = false;
  }
  return stores;
};

export const getAStore = async (id) => {
  const store = {};
  try {
    let storesRef = firestoreDB
      .collection("stores")
      .doc(id);
    store.data = await (await storesRef.get()).data();
    store.success = true;
  } catch (error) {
    store.error = error.message;
    store.success = false;
  }
  return store;
};
