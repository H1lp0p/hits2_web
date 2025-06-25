import React, { useState } from "react";
import "./checkbox.module.css";

interface CheckboxProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ defaultChecked = false, disabled = false, className = "" }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    if (!disabled) setChecked((prev) => !prev);
  };

  return (
    <label
      className={`custom-checkbox${checked ? " custom-checkbox--checked" : ""}${disabled ? " custom-checkbox--disabled" : ""} ${className}`}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          toggle();
        }
      }}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        readOnly
        className="custom-checkbox__input"
        tabIndex={-1}
      />
      <span className="custom-checkbox__box" />
    </label>
  );
};

export default Checkbox;
