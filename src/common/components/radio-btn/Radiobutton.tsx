import React from "react";
import "./Radiobutton.module.css";

interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label?: React.ReactNode;
  name: string;
  id?: string;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  name,
  id,
  className = "",
}) => {
  return (
    <div className={`custom-radio-wrapper ${className}`}>
      <label
        htmlFor={id}
        className={`custom-radio-label${disabled ? " custom-radio--disabled" : ""}`}
      >
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="custom-radio__input"
        />
        <span className="custom-radio__circle" />
        {label && <span className="custom-radio-text">{label}</span>}
      </label>
    </div>
  );
};

export default RadioButton;
