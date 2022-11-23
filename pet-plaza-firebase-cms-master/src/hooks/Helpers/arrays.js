export const removeElementFromArray = (array, element, field) => {
  return array.filter((item) =>
    field ? item[field] !== element : item !== element
  );
};

export const arrayOfDescription = (data, labels) => {
  let arrayOfReturn = [];
  for (let i in labels) {
    for (let j in data) {
      if (labels[i].field === data[j].field) {
        arrayOfReturn[i] = {
          item: data[j].data,
          label: labels[i].label,
        };
      }
    }
  }
  return arrayOfReturn;
};

export const arrayOfDescriptionByColumns = (data, labels) => {
  let arrayOfReturn = [];
  for (let i in labels) {
    let temp = [];
    for (let j in labels[i]) {
      for (let k in data) {
        if (labels[i][j].field === data[k].field) {
          temp[j] = {
            item: data[k].data,
            label: labels[i][j].label,
          };
        }
      }
    }
    arrayOfReturn[i] = temp;
  }
  return arrayOfReturn;
};

export const arrayHoraries = (horaries,entry,out) => {
  let horariesTemp = [];
  let open = new Date();
  let close = new Date();
  for (let i in horaries) {
    open.setTime(horaries[i][entry].valueOf());
    close.setTime(horaries[i][out].valueOf());
    for (let j in horaries[i].day) {
      if (horariesTemp.length > 0) {
        let exist = false;
        for (let h in horariesTemp) {
          if (horariesTemp[h].day === horaries[i].day[j]) {
            horariesTemp[h] = {
              ...horariesTemp[h],
              [out]: close.toLocaleTimeString("en-US"),
              [entry]: open.toLocaleTimeString("en-US"),
            };
            exist = true;
          }
        }
        if (!exist) {
          if (horaries[i].clinic) {
            horariesTemp.push({
              [out]: close.toLocaleTimeString("en-US"),
              [entry]: open.toLocaleTimeString("en-US"),
              day: horaries[i].day[j],
              clinic: horaries[i].clinic
            });
          }else{
            horariesTemp.push({
              [out]: close.toLocaleTimeString("en-US"),
              [entry]: open.toLocaleTimeString("en-US"),
              day: horaries[i].day[j],
            });
          }
        }
      } else {
        if (horaries[i].clinic) {
          horariesTemp.push({
            [out]: close.toLocaleTimeString("en-US"),
            [entry]: open.toLocaleTimeString("en-US"),
            day: horaries[i].day[j],
            clinic: horaries[i].clinic
          });
        }else{
          horariesTemp.push({
            [out]: close.toLocaleTimeString("en-US"),
            [entry]: open.toLocaleTimeString("en-US"),
            day: horaries[i].day[j],
          });
        }
      }
    }
  }
  return horariesTemp;
};

export const week = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export const Week = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const Hours = [
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
];

export const Months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
]

export const orderArrayWeek = (array, field) => {
  let response = [];
  for (let i in week) {
    for (let j in array) {
      if (array[j][field].toLowerCase() === week[i]) {
        response.push(array[j]);
      }
    }
  }
  return response;
};
