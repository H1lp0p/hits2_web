interface YearListProps {
  selectedYear: number;
  onSelect: (year: number) => void;
  min?: number;
  max?: number;
}

export const YearList: React.FC<YearListProps> = ({ selectedYear, onSelect, min = 2000, max = 2030 }) => {
  const years = [];
  for (let y = min; y <= max; y++) years.push(y);

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
      {years.map(year => (
        <div
          key={year}
          style={{
            padding: 8,
            cursor: "pointer",
            background: year === selectedYear ? "#e3f2fd" : "transparent",
            borderRadius: 4,
          }}
          onClick={() => onSelect(year)}
        >
          {year}
        </div>
      ))}
    </div>
  );
};