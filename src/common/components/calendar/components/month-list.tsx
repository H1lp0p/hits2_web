export const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

interface MonthListProps {
  selectedMonth: number;
  onSelect: (month: number) => void;
}

export const MonthList: React.FC<MonthListProps> = ({ selectedMonth, onSelect }) => {
  return (
    <div style={{
      maxHeight: 200,
      overflowY: "auto",
      padding: 8,
      border: "1px solid #ddd",
      borderRadius: 8,
      background: "#fff",
      userSelect: "none"
    }}>
      {MONTHS.map((month, idx) => (
        <div
          key={month}
          style={{
            padding: 8,
            cursor: "pointer",
            background: idx === selectedMonth ? "#e3f2fd" : "transparent",
            borderRadius: 4,
          }}
          onClick={() => onSelect(idx)}
        >
          {month}
        </div>
      ))}
    </div>
  );
};