import { firebaseStorage } from "../../Firebase";

export const getCodeWithDate = () => {
    let date = new Date();
    let codeNow = date.getTime();
    return codeNow;
  };
  
  export const setStorage = async (file, pathName) => {
    let task = { imageRef: [] };
    try {
      let codeDate = getCodeWithDate();
      let storageRef = firebaseStorage.ref(pathName + codeDate);
      task.imageRef.push(await storageRef.put(file));
      task.success = true;
      return task;
    } catch (error) {
      task.success = false;
      task.error = error.message;
      return task;
    }
  };
  
  export const removeStorage = async (urlFile) => {
    let task = {};
    try {
      let storageRef = firebaseStorage.refFromURL(urlFile);
      await storageRef.delete();
      task.success = true;
      return task;
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        task.success = true;
        return task;
      } else {
        task.success = false;
        task.error = error.message;
        return task;
      }
    }
  };