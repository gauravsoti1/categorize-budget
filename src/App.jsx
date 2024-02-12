import "./styles.css";
import { useState } from "react";
import ExpenseChart from "./ExpenseChart";
import {
  getCost,
  convertEntryDataToExportableDataAndDownloadCSV,
} from "./utils";
import AppCSVReader, { initialColumnPositions } from "./AppCSVReader";
import ColumnPosition, { ColumnPositionPresets } from "./ColumnPosition";
import UploadTypeComponent, { dataUploadTypes } from "./UploadTypeComponent";
import AddNewEntryRow from "./AddNewEntryRow";
import { createEntry } from "./entry";
import { categories as initialCategoriesData } from "./data";
import BudgetCategories from "./BudgetCategories";
import CategorySelect from "./CategorySelect";

const newEditRowValue = () =>
  createEntry(
    {
      date: "",
      description: "",
      credit: 0,
      debit: 0,
      category: "",
      type: "manual",
    },
    false
  );

export default function App() {
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [columnPositions, setColumnPositions] = useState(
    initialColumnPositions
  );
  const [selectedUploadType, setUploadType] = useState(dataUploadTypes.reset);
  const [valuesForEditRow, setValuesForEditRow] = useState(newEditRowValue());
  const [categories, setCategories] = useState(
    Object.keys(initialCategoriesData)
  );

  const onAddNewCategory = (category) => {
    setCategories((current) => [...current, category]);
  };
  const onEditRowValueChange = (e) => {
    setValuesForEditRow((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const onUploadTypeChange = (e) => {
    setUploadType(e.target.value);
  };

  const onPositionChange = (key, value) => {
    setColumnPositions((currentPositions) => {
      return { ...currentPositions, [key]: value };
    });
  };
  const onCategoryChange = (findKey) => (e) => {
    setData((data) => {
      const index = data.findIndex(({ key }) => key === findKey);
      return data.map((d, i) => {
        if (i === index) return { ...d, category: e.target.value };
        else return { ...d };
      });
    });
  };
  const onNewManualEntryAddClick = (valuesObject) => {
    if (
      !valuesObject.key ||
      !valuesObject.date ||
      !valuesObject.description ||
      valuesObject.category === "Category"
    ) {
      alert("Please enter all values");
      return;
    }

    setData((data) => [valuesObject, ...data]);
    setValuesForEditRow(newEditRowValue());
  };

  const onRowValuesEdit = (valuesObject) => {
    if (
      !valuesObject.date ||
      !valuesObject.description ||
      valuesObject.category === "Category"
    ) {
      alert("Please enter all values");
      return;
    }

    setData((data) =>
      data.map((o) => {
        if (o.key !== valuesObject.key) return o;
        else return valuesObject;
      })
    );
    setValuesForEditRow(newEditRowValue());
  };

  const onIncludeChange = (findKey) => {
    setData((data) => {
      const index = data.findIndex(({ key }) => key === findKey);
      console.log("index = ", index);
      return data.map((d, i) => {
        if (i === index) return { ...d, include: !d.include };
        else return { ...d };
      });
    });
  };

  const filteredData = data.filter(({ category }) =>
    !filterBy ? true : category?.toLowerCase() === filterBy.toLowerCase()
  );

  const onDeleteEntry = (findKey) => {
    if (!findKey) throw new Error("key for the object wasn't provided");
    const index = data.findIndex(({ key }) => key === findKey);

    setData((data) => {
      const newData = [...data];
      newData.splice(index, 1);
      return newData;
    });
  };

  const onExport = (dataToExport) => {
    convertEntryDataToExportableDataAndDownloadCSV(dataToExport);
  };

  return (
    <div className="App container mx-auto">
      <UploadTypeComponent
        selectedUploadType={selectedUploadType}
        onUploadTypeChange={onUploadTypeChange}
      />
      <ColumnPosition
        columnPositions={columnPositions}
        onPositionChange={onPositionChange}
        Presets={
          <ColumnPositionPresets setColumnPositions={setColumnPositions} />
        }
      />
      <BudgetCategories categories={categories} onAddNew={onAddNewCategory} />
      <AppCSVReader
        setData={setData}
        selectedUploadType={selectedUploadType}
        columnPositions={columnPositions}
      />
      <div style={{ paddingBottom: "2rem" }}>
        <label htmlFor="filterCategory">Filter by Category: </label>
        <input
          type="text"
          id="filterCategory"
          onChange={(e) => setFilterBy(e.target.value)}
        />
      </div>
      {data.length > 0 && filterBy && (
        <h4>
          {" "}
          Cost of ${filterBy} = ${getCost(data)(filterBy)}
        </h4>
      )}
      <button
        disabled={filteredData.length === 0}
        onClick={() => onExport(filteredData)}
      >
        Export Data
      </button>

      {data.length > 0 && <ExpenseChart expenses={data} />}

      <table style={{ width: "100%", padding: "2rem 0" }}>
        <thead>
          <tr>
            <th></th>
            <th align="left"> Date</th>
            <th> Description</th>
            <th> Credit</th>
            <th> Debit</th>
            <th> Category</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          <AddNewEntryRow
            onAdd={onNewManualEntryAddClick}
            valuesObject={valuesForEditRow}
            onChange={onEditRowValueChange}
            onUpdate={onRowValuesEdit}
            allCategories={categories}
          />
          {filteredData.map((rowObject, index) => {
            const { key, date, debit, credit, description, include, category } =
              rowObject;
            return (
              <tr key={key}>
                <td>
                  <input
                    type="checkbox"
                    checked={include}
                    onChange={() => onIncludeChange(key)}
                  />{" "}
                </td>
                <td>{date} </td>
                <td styles={{ paddingLeft: "1rem" }}>{description} </td>
                <td>{credit || "-"} </td>
                <td>{debit || "-"} </td>
                <td>
                  <CategorySelect
                    allCategories={categories}
                    value={category}
                    onChange={(e) => onCategoryChange(key)(e)}
                  />
                </td>
                <td>
                  <button onClick={() => setValuesForEditRow(rowObject)}>
                    Edit
                  </button>
                  <button onClick={() => onDeleteEntry(key)}>Delete</button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
