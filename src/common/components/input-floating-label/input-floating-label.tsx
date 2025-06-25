import React, { ChangeEvent, useState, FocusEvent } from 'react';
import styles from './input-floating-label.module.css';



export interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  supportingText?: string;
  preffix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  state?: "disabled" | "error" | "default" 
}

export const Input: React.FC<FloatingLabelInputProps> = (props) => {
  
  const { id, label, value, onChange, type = 'text', preffix, suffix, supportingText, state } = props
  
  let self_color = undefined

  switch (state){
    case "error": 
      self_color = "#EB5757"
      break;
    case "disabled":
      self_color = "#3A3A3A80"
      break;
  }

  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value.length > 0;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => setIsFocused(false);


  return (
    <div style={{margin: "1rem 0rem"}}>
      <div
        className={`${styles.floatingLabelInput} ${isFocused ? styles.floatingLabelInputFocusWithin : ''}`}
        style={self_color ? {borderColor: self_color} : undefined}
      >
        {preffix &&
          <div className={styles.preffix}>
            {preffix}
          </div>
        }
        <div className={styles.inputContainer}>

          <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="off"
          placeholder=" "
          className={styles.floatingInput + ` p1`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={self_color ? {color: self_color} : undefined}
          disabled={state == "disabled"}
        />
        <label
          htmlFor={id}
          className={`${styles.floatingLabel} ${(isFocused ? (preffix ? styles.focusedLabelWithPref : styles.focusedLabel) : '')} ${isFilled ? (preffix ? styles.filledLabelWithPref : styles.filledLabel) : ''} p2`}
          style={self_color ? {color: self_color} : undefined}
        >
          {label}
        </label>

        </div>
        {suffix &&
          <div className={styles.suffix}>
            {suffix}
          </div>
        }
      </div>
        {supportingText && 
          <span className={"p2"} style={{margin: "1rem", color: self_color}}>
            {supportingText}
          </span>
        }
    </div>
  );
};
