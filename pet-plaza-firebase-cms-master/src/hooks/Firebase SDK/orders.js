import { firestoreDB } from "../../Firebase";

const limitOrdersRequest = 10;

export const getOrdersByBlock = async (lastRecord, status, range, store) => {
  const orders = { data: [] };
  try {
    const ordersRef = firestoreDB
      .collection("orders")
      .orderBy("date.milliseconds", "desc");

    const rangeRef = range
      ? ordersRef.startAt(range[1].valueOf()).endAt(range[0].valueOf())
      : ordersRef;

    const statusRef = status
      ? rangeRef.where("status", "==", status)
      : rangeRef;

    const storeRef = store
      ? statusRef.where("storeId", "==", store)
      : statusRef;

    const finalRef = lastRecord
      ? storeRef.startAfter(lastRecord).limit(limitOrdersRequest)
      : storeRef.limit(limitOrdersRequest);
    orders.snapshot = await finalRef.get();
    orders.snapshot.forEach((doc) => {
      orders.data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    orders.success = true;
  } catch (error) {
    console.log(error)
    orders.success = false;
    orders.error = error.message;
  }
  return orders;
};

export const getOrdersById = async (id) => {
  const orders = { data: [] };
  try {
    let orderRef = await firestoreDB.collection("orders").doc(id).get();

    orders.data.push(await orderRef.data());
    orders.success = true;
  } catch (error) {
    orders.success = false;
  }
  return orders;
};
