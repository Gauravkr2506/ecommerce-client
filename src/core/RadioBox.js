import { useState, useEffect } from "react";

export default function RadioBox({ prices, handleFilters }) {
  const [value, setValue] = useState(0);

  //   useEffect(() => {
  //     setChecked(categories.map((c) => c._id));
  //   }, [categories]);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((price, index) => (
    <div key={index}>
      <input
        value={`${price._id}`}
        onChange={handleChange}
        type="radio"
        name={price}
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
}
