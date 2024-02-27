import React from "react";

function FilterSelect(props) {
  return (
    <select>
      <option value="">{props.name}..</option>
      {props.values.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
