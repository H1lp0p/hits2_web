import React, { ChangeEvent, useState, FocusEvent } from 'react';
import styles from './input-floating-label.module.css';

export interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input: React.FC<FloatingLabelInputProps> = ({ id, label, value, onChange, type = 'text' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = value.length > 0;

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => setIsFocused(false);

  return (
    <div
      className={`${styles.floatingLabelInput} ${isFocused ? styles.floatingLabelInputFocusWithin : ''}`}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder=" "
        className={styles.floatingInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label
        htmlFor={id}
        className={`${styles.floatingLabel} ${(isFocused ? styles.focusedLabel : '')} ${isFilled ? styles.filledLabel : ''}`}
      >
        {label}
      </label>
    </div>
  );
};
