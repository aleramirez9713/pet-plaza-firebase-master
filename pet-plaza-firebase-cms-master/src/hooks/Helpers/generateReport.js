import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const arrayForExcel = (columns) => {
  let response = { columns: [], order: [] };
  let temp = {};
  for (let column in columns) {
    temp[columns[column].key] = columns[column].label;
    response.order.push(columns[column].key);
  }
  response.columns.push(temp);
  return response;
};

export const exportExcel = (csvData, arrayColumns, fileName) => {
  const columns = arrayForExcel(arrayColumns);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(columns.columns, {
    header: columns.order,
    skipHeader: true,
  });
  XLSX.utils.sheet_add_json(ws, csvData, {
    header: columns.order,
    skipHeader: true,
    origin: "A2",
  });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
