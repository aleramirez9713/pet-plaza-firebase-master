export const stringToNumber = (str) => {
    let number = parseInt(str, 10);
    if (number.toString().length === str.length) {
      return number;
    } else {
      return false;
    }
  };