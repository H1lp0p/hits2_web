import React, { useState } from "react";
import style from "./switch.module.css";

interface SwitchProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void; 
}

const Switch: React.FC<SwitchProps> = ({ defaultChecked = false, disabled = false, className = "" , onChange}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (onChange) {
      onChange(newChecked);
      setChecked(newChecked);
    } else {
      setChecked(newChecked);
    }
  };

  return (
    <label className={`${style.customSwitch} ${checked ? style.customSwitchChecked : ""}${disabled ? style.customSwitchDisabled : ""} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={style.customSwitchInput}
        tabIndex={disabled ? -1 : 0}
      />
      <span className={style.customSwitchTrack}>
        <span className={style.customSwitchThumb} />
      </span>
    </label>
  );
};

export default Switch;