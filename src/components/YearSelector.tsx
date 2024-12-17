import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export function YearSelector({ selectedYear, onYearChange }: Props) {
  const years = [2024, 2023, 2022];
  
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onYearChange(selectedYear + 1)}
        className="p-1 rounded-full hover:bg-gray-100"
        disabled={selectedYear >= Math.max(...years)}
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </button>
      
      <div className="flex space-x-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedYear === year
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <button
        onClick={() => onYearChange(selectedYear - 1)}
        className="p-1 rounded-full hover:bg-gray-100"
        disabled={selectedYear <= Math.min(...years)}
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}