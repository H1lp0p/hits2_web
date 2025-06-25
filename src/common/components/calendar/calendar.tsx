import React, { useState, useEffect } from "react";
import Left from '../../../assets/left.svg?react';
import Right from '../../../assets/right.svg?react';
import { YearList } from "./components/year-list";
import { MONTHS, MonthList } from "./components/month-list";
import { CalendarDays } from "./components/Days";
import {TimePickerPanel} from "./components/Time";

const activeColor = "#375FFF";
const defaultColor = "#3A3A3A";

type Panel = "calendar" | "year" | "month" | "time";

interface CustomDatepickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  onClose?: () => void;
  showTime?: boolean;
}

const CustomDatepicker: React.FC<CustomDatepickerProps> = ({ value, onChange, onClose, showTime = false }) => {

 const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value.getFullYear(), value.getMonth(), value.getDate()) : null
  );
  const [hours, setHours] = useState(value?.getHours() ?? 0);
  const [minutes, setMinutes] = useState(value?.getMinutes() ?? 0);
  const [year, setYear] = useState<number>(
    selectedDate?.getFullYear() ?? new Date().getFullYear()
  );
  const [month, setMonth] = useState<number>(
    selectedDate?.getMonth() ?? new Date().getMonth()
  );
  const [panel, setPanel] = useState<Panel>("calendar");



  useEffect(() => {
      if (value) {
        setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()));

        setYear(value.getFullYear());
        setMonth(value.getMonth());

        setHours(value.getHours());
        setMinutes(value.getMinutes());
      } else {
        setSelectedDate(null);
        setHours(0);
        setMinutes(0);
        setYear(new Date().getFullYear());
        setMonth(new Date().getMonth());
      }
    }, [value]);

  useEffect(() => {
      if (selectedDate) {
        setYear(selectedDate.getFullYear());
        setMonth(selectedDate.getMonth());
      }
    }, [selectedDate]);

  const changeYear = (delta: number) => {
    setYear(prev => {
      const next = prev + delta;
      if (next < 2000) return 2000;
      if (next > 2030) return 2030;
      return next;
    });
  };

  const changeMonth = (delta: number) => {
    setMonth(prev => {
      let next = prev + delta;
      let newYear = year;
      if (next < 0) {
        next = 11;
        newYear = Math.max(2000, year - 1);
      } else if (next > 11) {
        next = 0;
        newYear = Math.min(2030, year + 1);
      }
      if (newYear !== year) setYear(newYear);
      return next;
    });
  };

const handleYearSelect = (y: number) => {
    setYear(y);
    if (selectedDate){
      const newDate = new Date(selectedDate);
      newDate.setFullYear(y);
      setSelectedDate(newDate);
    }else{
      setSelectedDate(new Date(y, month, 1));
    }
    setPanel("calendar");
  };

  const handleMonthSelect = (m: number) => {
    setMonth(m);
    if (selectedDate){
      const newDate = new Date(selectedDate);
      newDate.setMonth(m);
      setSelectedDate(newDate);
    }else{
      setSelectedDate(new Date(year, m, 1));
    }
    setPanel("calendar");
  };

  const handleDaySelect = (date: Date) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  const handleHourSelect = (h: number) => {
    setHours(h);
  };

  const handleMinuteSelect = (m: number) => {
    setMinutes(m);
  };

  const handleOk = () => {
    if (!selectedDate) {
    // Можно показать ошибку или не сохранять время без даты
    return;
  }
  const newDate = new Date(selectedDate);
  newDate.setHours(hours, minutes, 0, 0);
  onChange(newDate);
  if (onClose) onClose();
  };

  const handleCancel = () => {
  if (value) {
    setSelectedDate(new Date(value.getFullYear(), value.getMonth(), value.getDate()));
    setHours(value.getHours());
    setMinutes(value.getMinutes());
    setYear(value.getFullYear());
    setMonth(value.getMonth());
  } else {
    setSelectedDate(null);
    setHours(0);
    setMinutes(0);
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth());
  }
  if (onClose) onClose();
};


  return (
    <div
      style={{
        width: 380,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: 12,
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, gap: 12 }}>
        {/* Блок месяца */}
        <div style={{
          display: "flex",
          alignItems: "center",
          width:"139px",
          justifyContent: "center"
        }}>
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Предыдущий месяц"
            style={{ backgroundColor: "transparent", cursor: "pointer", flexShrink: 0, fontSize: 14, padding: "4px 8px", outline:"none", border:"none", color: panel=== "month" ? activeColor: defaultColor}}
          >
            <Left stroke={panel=== "month" ? activeColor: defaultColor} width="16px" height="16px" />
          </button>
          <button
            onClick={() => setPanel("month")}
            style={{
              flexGrow: 1,
              minWidth: 0,
              background: "none",
              border: "none",
              color: panel=== "month" ? activeColor: defaultColor,
              fontSize: 14,
              cursor: "pointer",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: "0 6px",
              userSelect: "none",
            }}
            aria-haspopup="listbox"
            aria-expanded={panel === "month"}
          >
            {MONTHS[month]}
          </button>
          <button
            onClick={() => changeMonth(1)}
            aria-label="Следующий месяц"
            style={{ backgroundColor: "transparent", cursor: "pointer", flexShrink: 0, fontSize: 14, padding: "4px 8px", outline:"none", border:"none", color:panel=== "month" ? activeColor: defaultColor }}
          >
            <Right stroke={panel=== "month" ? activeColor: defaultColor} width="16px" height="16px"/>
          </button>
        </div>
        {/*Блок времени*/}
        {showTime &&
          <button
          onClick={() => {if (showTime) setPanel("time")}}
          style={{
            background: "none",
            border: "none",
            color: panel === "time" ? activeColor : defaultColor,
            fontSize: 14,
            cursor: "pointer",
            userSelect: "none",
            padding: "4px 8px",
          }}
          aria-haspopup="listbox"
          aria-expanded={panel === "time"}
        >
          Время
        </button>}
        {/* Блок года */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          minWidth: 0,
          justifyContent: "center"
        }}>
          <button
            onClick={() => changeYear(-1)}
            aria-label="Предыдущий год"
            style={{ backgroundColor: "transparent", cursor: "pointer", flexShrink: 0, fontSize: 14, padding: "4px 8px", outline:"none", border:"none", color:panel=== "year" ? activeColor: defaultColor }}
          >
            <Left stroke={panel=== "year" ? activeColor: defaultColor} width="16px" height="16px"/>
          </button>
          <button
            onClick={() => setPanel("year")}
            style={{
              background: "none",
              border: "none",
              color: panel=== "year" ? activeColor: defaultColor,
              fontSize: 16,
              cursor: "pointer",
              minWidth: 50,
              whiteSpace: "nowrap",
              userSelect: "none",
              padding: "0 6px",
              textAlign: "center",
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            aria-haspopup="listbox"
            aria-expanded={panel === "year"}
          >
            {year}
          </button>
          <button
            onClick={() => changeYear(1)}
            aria-label="Следующий год"
            style={{ backgroundColor: "transparent", cursor: "pointer", flexShrink: 0, fontSize: 14, padding: "4px 8px", outline:"none", border:"none", color:panel=== "year" ? activeColor: defaultColor }}
          >
            <Right stroke={panel=== "year" ? activeColor: defaultColor} width="16px" height="16px"/>
          </button>
        </div>
      </div>
      {/* Горизонтальная линия */}
      <hr style={{ borderColor: "#ddd", margin: "0 0 12px 0", width: "100%" }} />

      {/* Панели выбора месяца/года или календарь */}
      {panel === "month" && (
        <MonthList selectedMonth={month} onSelect={handleMonthSelect} />
      )}
      {panel === "year" && (
        <YearList selectedYear={year} onSelect={handleYearSelect} min={2000} max={2030} />
      )}
      {panel === "calendar" && (
        <CalendarDays
          year={year}
          month={month}
          selectedDate={selectedDate}
          onSelect={handleDaySelect}
        />
      )}
       {panel === "time" && showTime && (
        <TimePickerPanel
          selectedHours={hours}
          selectedMinutes={minutes}
          onSelectHours={handleHourSelect}
          onSelectMinutes={handleMinuteSelect}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, gap: 8 }}>
        <button
          onClick={handleOk}
          style={{ color: "#3A3A3A", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
        >
          Ок
        </button>
        <button
          onClick={handleCancel}
          style={{ color: "#3A3A3A", background: "none", border: "none", cursor: "pointer", fontSize: 16 }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default CustomDatepicker;
