import { useState, useEffect } from "react";
import { categories } from "./data";
import { createEntry, generateUniqSerial } from "./entry";
import CategorySelect from "./CategorySelect";

const AddNewEntryRow = ({
  onAdd,
  onUpdate,
  onChange,
  valuesObject,
  allCategories,
}) => {
  return (
    <tr>
      <td></td>
      <td>
        <input
          type="date"
          name="date"
          id="dateField"
          placeholder="Add Date"
          onChange={onChange}
          value={valuesObject.date}
        />{" "}
      </td>
      <td>
        <input
          type="text"
          name="description"
          id="descriptionField"
          placeholder="Add Description"
          onChange={onChange}
          value={valuesObject.description}
        />{" "}
      </td>
      <td>
        <input
          type="number"
          name="credit"
          id="creditField"
          placeholder="Credit"
          onChange={onChange}
          style={{ width: "40px" }}
          value={valuesObject.credit}
        />
      </td>
      <td>
        <input
          type="number"
          name="debit"
          id="debitField"
          placeholder="Debit"
          style={{ width: "40px" }}
          size={4}
          onChange={onChange}
          value={valuesObject.debit}
        />
      </td>
      <td>
        <CategorySelect
          allCategories={allCategories}
          value={valuesObject.category}
          onChange={onChange}
        />
      </td>
      <td>
        {!valuesObject.key && (
          <button
            onClick={() =>
              onAdd({ ...valuesObject, key: generateUniqSerial() })
            }
          >
            Add
          </button>
        )}
        {valuesObject.key && (
          <button onClick={() => onUpdate(valuesObject)}>Update</button>
        )}
      </td>
    </tr>
  );
};

export default AddNewEntryRow;
