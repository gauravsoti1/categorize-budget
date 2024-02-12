import Collapsible from "./Collapsible";
import { useState } from "react";

const BudgetCategories = ({ categories, onAddNew }) => {
  const [category, setCategory] = useState("");

  return (
    <Collapsible title="Define your budget categories">
      <input
        type="Text"
        placeholder="Add new category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <button
        onClick={() => {
          onAddNew(category);
          setCategory("");
        }}
      >
        Add
      </button>
      <ol>
        {categories.map((c) => (
          <li>{c}</li>
        ))}
      </ol>
    </Collapsible>
  );
};

export default BudgetCategories;
