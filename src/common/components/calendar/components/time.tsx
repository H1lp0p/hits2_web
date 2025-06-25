import React, { useRef } from "react";
import style from './time.module.css'

interface TimePickerPanelProps {
  selectedHours: number;
  selectedMinutes: number;
  onSelectHours: (h: number) => void;
  onSelectMinutes: (m: number) => void;
}

export  const TimePickerPanel: React.FC<TimePickerPanelProps> = ({
  selectedHours,
  selectedMinutes,
  onSelectHours,
  onSelectMinutes,
}) => {
  return (
    <div className={style.containerStyle} aria-label="Выбор времени" role="listbox">
        {/* Hours */}
        <div>
          <input
          className={style.input_number}
          type="number" 
          min={0} 
          max={23} 
          value={selectedHours} 
          onChange={(e) => onSelectHours(parseInt(e.target.value))}/>
        </div>
        <span style={{fontSize: "50px"}}>:</span>

        {/* Minutes */}
        
        <div>
          <input
          className={style.input_number}
          type="number"
          min={0} 
          max={59} 
          value={selectedMinutes} 
          onChange={(e) => onSelectMinutes(parseInt(e.target.value))}/>
        </div>

    </div>
  );
};

export default TimePickerPanel;
