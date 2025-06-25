import React, { ChangeEvent, useState } from "react";
import CustomDatepicker from "../calendar/calendar";
import CalendarIcon from '../../../assets/calendar.svg?react';
import { Input } from "../input-floating-label/input-floating-label";

export interface DateInputWithCustomPickerProps{
  value?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function DateInputWithCustomPicker() {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (open){
        setOpen(false)
    }
    else{
        setOpen(true)
    }
  }
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <Input
        type="text"
        value={date ? date.toLocaleDateString() : ""}
        onChange={(event:ChangeEvent<HTMLInputElement>) => {setDate(event.target.value == "" ? null : new Date(event.target.value))}}
        id="DatePicker"
        label="Введите дату"
        suffix={<button
        type="button"
        onClick={handleClick}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: 0,
          margin: 0,
        }}
        aria-label="Открыть календарь"
      >
        <CalendarIcon width={24} height={24}></CalendarIcon>
      </button>}
      />
      

      {open && (
        <div style={{ position: "absolute", zIndex: 1000, top: "100%", left: 0 }}>
          <CustomDatepicker
            value={date}
            onChange={d => setDate(d)}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}