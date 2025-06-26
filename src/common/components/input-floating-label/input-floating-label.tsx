import React, { ChangeEvent, useState, FocusEvent } from 'react';
import css from './input-floating-label.module.css';
import { BaseProps } from '../../interfaces/base-props';

export type InputStates = "disabled" | "error" | "default"

export interface FloatingLabelInputProps extends BaseProps {
  id: string;
  label: string;
  value?: string;
  supportingText?: string;
  preffix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  state?: InputStates,
}

export const Input: React.FC<FloatingLabelInputProps> = (props) => {
  
  const { id, label, value, onChange, type = 'text', preffix, suffix, supportingText, state = "default", style, className} = props
  
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
  const isFilled = value ? value.length > 0 : false;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => setIsFocused(false);


  return (
    <div style={{...style}} className={className}>
      <div
        className={`${css.floatingLabelInput} ${isFocused ? css.floatingLabelInputFocusWithin : ''}`}
        style={self_color ? {borderColor: self_color} : undefined}
      >
        {preffix &&
          <div className={css.preffix}>
            {preffix}
          </div>
        }
        <div className={css.inputContainer}>

          <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="off"
          placeholder=" "
          className={css.floatingInput + ` p1`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={self_color ? {color: self_color} : undefined}
          disabled={state == "disabled"}
        />
        <label
          htmlFor={id}
          className={`${css.floatingLabel} ${(preffix ? css.focusedLabelWithPref : css.focusedLabel)} ${isFilled ? (preffix ? css.filledLabelWithPref : css.filledLabel) : ''} p2`}
          style={self_color ? {color: self_color} : undefined}
        >
          {label}
        </label>

        </div>
        {suffix &&
          <div className={css.suffix}>
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
