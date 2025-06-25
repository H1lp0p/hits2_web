import React, { ChangeEvent, useState } from "react";
import Switch from "../switch/switch";
import CustomDatepicker from "../calendar/calendar";
import CalendarIcon from '../../../assets/calendar.svg?react';
import style from "./DateTimeSelector.module.css";
import { Input } from "../input-floating-label/input-floating-label";

export default function DateTimeSelector() {
  const [showTime, setShowTime] = useState(false);
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
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Input
                type="text"
                value={date ? 
                  showTime ? date.toLocaleString('ru-RU', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false // 24-часовой формат вместо AM/PM
                                  }).replace(/,/, '')
                            : date.toLocaleString('ru-RU', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  }).replace(/,/, '') : ""}

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
              onChange={setDate}
              onClose={() => setOpen(false)}
              showTime={showTime}
            />
          </div>
        )}
      </div>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", justifyItems: "center"}}>
        <span className="p1" style={{justifySelf: "center", textAlign: "center", margin: "8px"}}>Время</span>
        <Switch defaultChecked={showTime} onChange={setShowTime} />
      </div>
    </div>
  );
}