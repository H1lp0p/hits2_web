import React, { useState } from "react";
import css from "./switch.module.css";
import { BaseProps } from "../../interfaces/base-props";

interface SwitchProps extends BaseProps {
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void; 
}

const Switch: React.FC<SwitchProps> = ({ defaultChecked = false, disabled = false, className, onChange, style}) => {
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
    <label className={`${css.customSwitch} ${checked ? css.customSwitchChecked : ""}${disabled ? css.customSwitchDisabled : ""} ${className}`} style={style}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={css.customSwitchInput}
        tabIndex={disabled ? -1 : 0}
      />
      <span className={css.customSwitchTrack}>
        <span className={css.customSwitchThumb} />
      </span>
    </label>
  );
};

export default Switch;