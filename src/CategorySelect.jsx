const CategorySelect = ({ allCategories = [], value, onChange }) => {
  return (
    <select
      name="category"
      id="categoryField"
      onChange={onChange}
      value={value}
    >
      <option>Category</option>
      {allCategories
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((category) => (
          <option value={category}>{category}</option>
        ))}
      <option>Other</option>
    </select>
  );
};

export default CategorySelect;
