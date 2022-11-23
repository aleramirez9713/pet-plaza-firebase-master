import moment from "moment";
import { Week, Hours } from "./arrays";

export const disabledDateAfterToday = (current) => {
  return current && current > moment().endOf("day");
};

export const disabledDateBeforeToday = (current) => {
  return current && current < moment().startOf("day");
};

export const freeDays = (vetInfo, date) => {
  if (vetInfo.horaries) {
    return vetInfo.horaries.filter((e) => Week[date.day()] === e.day);
  } else {
    return true;
  }
};

export const hoursString = (str) => {
  let temp = str.split(":");
  let hour = parseInt(temp[0]);
  let min = temp[1];
  return `${Hours[hour]}:${min} ${hour > 12 ? "PM" : "AM"}`;
};
