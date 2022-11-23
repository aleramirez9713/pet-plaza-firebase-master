export const handleOnSearch = (filters, data, filterBy) => {
    let empty = 0;
    let temp = [];
    try {
      for (let filter in filters) {
        let regex = new RegExp(filters[filter], "i");
        let arraysFiltered = [];
        if (filters[filter] === "" || filters[filter] === 0) {
          empty = empty + 1;
        } else {
          filterBy.forEach((e) => {
            arraysFiltered.push(data.filter((data) => regex.test(data[e.filter])));
          });
          for (let i in arraysFiltered) {
            if (arraysFiltered[i].length > 0) {
              for (let j in arraysFiltered[i]) {
                temp.push(arraysFiltered[i][j]);
              }
            }
          }
        }
      }
      return empty === Object.entries(filters).length ? data : [...new Set(temp)];
    } catch (error) {
      return data;
    }
  };