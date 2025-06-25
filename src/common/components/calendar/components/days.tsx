import style from "../Calendar.module.css";
interface CalendarDaysProps {
  year: number;
  month: number;
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export const CalendarDays: React.FC<CalendarDaysProps> = ({ year, month, selectedDate, onSelect }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: { day: number; currentMonth: boolean }[] = [];

  for (let i = offset - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, currentMonth: false });
  }

  for (let d = 1; d <= daysInCurrentMonth; d++) {
    days.push({ day: d, currentMonth: true });
  }

  while (days.length % 7 !== 0 || days.length < 42) {
    days.push({ day: days.length - daysInCurrentMonth - offset + 1, currentMonth: false });
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, userSelect: "none" }}>
      {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(day => (
        <div key={day} style={{ textAlign: "center", paddingBottom: 4, whiteSpace: "nowrap" }}>{day}</div>
      ))}
      {days.map(({ day, currentMonth }, idx) => {
        const isSelected =
          currentMonth &&
          selectedDate !== null &&  
          selectedDate.getFullYear() === year &&
          selectedDate.getMonth() === month &&
          selectedDate.getDate() === day;

        return (
          <div
            key={idx}
            className={`${currentMonth ? (isSelected ? style.daySelected : style.dayCurrentMonth + ` ${style.day}`) : style.day}`}
            onClick={() => currentMonth && onSelect(new Date(year, month, day))}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};