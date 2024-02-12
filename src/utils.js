import { categoriesMap, parsedData, categories } from "./data";

export const getCategory = (description) => {
  if (!description) return "";
  const result = [];
  categoriesMap.forEach((value, key) => {
    console.log("key,value", key, value, "description = ", description);
    const matchedString = description.match(new RegExp(key, "i"));
    // console.log("matched string =", matchedString);

    if (matchedString) {
      result.push(value);
    }
  });
  return result[0];
};

export const getCost = (data) => (filterByCategory) => {
  let result = 0;
  data
    .filter(({ include }) => include)
    .forEach(({ date, credit, debit, description, category }) => {
      if (filterByCategory?.toLowerCase() === category?.toLowerCase()) {
        result += debit;
        result -= credit;
      }
    });
  return result;
};

export const convertEntryDataToExportableDataAndDownloadCSV = (entryData) => {
  const categoryKeys = Object.keys(categories);
  const dataToExport = categoryKeys.map((category) => [
    category,
    getCost(entryData)(category),
  ]);
  let csvContent =
    "data:text/csv;charset=utf-8," +
    dataToExport.map((e) => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
};
