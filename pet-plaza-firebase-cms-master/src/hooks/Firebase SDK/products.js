import { firestoreDB } from "../../Firebase";

export const getAProduct = async (id) => {
  const product = {};
  try {
    let productRef = firestoreDB
      .collection("products")
      .doc(id);
    product.snapshot = await productRef.get();
    if (!product.snapshot.data()) {
      product.success = false;
      return product;
    }
    product.data = product.snapshot.data();
    product.success = true;
  } catch (error) {
    product.success = false;
    product.error = error.message;
  }
  return product;
};

export const getProducts = async (category, whithCategory, type) => {
  const products = { data: [] };
  try {
    let productsRef = firestoreDB
      .collection("products")
      .where("type","==",type)
      .orderBy("name", "asc")
    let productsData = whithCategory
      ? productsRef.where("caseSearch", "array-contains", category)
      : productsRef;

    products.snapshot = await productsData.get();

    products.snapshot.forEach((doc) => {
      if (whithCategory) {
        products.data.push({ id: doc.id, ...doc.data() });
      } else {
        if (!doc.data()[category]) {
          products.data.push({ id: doc.id, ...doc.data() });
        }
      }
    });
    products.success = true;
  } catch (error) {
    products.success = false;
    products.error = error.message;
  }
  return products;
};

const limitProductsRequest = 10;

export const getProductsByType = async (lastRecord, textSearch, type, category) => {
  const products = { data: [] };
  try {
    const ref = firestoreDB
      .collection("products");
    const productsRef = ref
      .where("type", "==", type)
      .orderBy("name", "asc");
    const productSearchtRef = textSearch
      ? productsRef.where("caseSearch", "array-contains", `${textSearch}`)
      : productsRef;
    
    const productCategoryRef = category
      ? productSearchtRef.where("categories", "array-contains", `${category}`)
      : productSearchtRef

    const finalRef = lastRecord
      ? productCategoryRef.startAfter(lastRecord).limit(limitProductsRequest)
      : productCategoryRef.limit(limitProductsRequest);

    products.snapshot = await finalRef.get();
    products.snapshot.forEach((doc) => {
      products.data.push({ id: doc.id, ...doc.data() });
    });
    products.success = true;
  } catch (error) {
    products.success = false;
    products.error = error.message;
  }
  return products;
};
