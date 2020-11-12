import { useState, useEffect } from "react";

export default function Checkbox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  //   useEffect(() => {
  //     setChecked(categories.map((c) => c._id));
  //   }, [categories]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
      setChecked(newCheckedCategoryId);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        value={checked.includes(category._id)}
        onChange={handleToggle(category._id)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
}
