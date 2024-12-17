import { YearSelector } from './YearSelector';

interface Props {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export function Navbar({ selectedYear, onYearChange }: Props) {
  return (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* <Calendar className="w-6 h-6 text-blue-600" /> */}
            <span className="ml-2 text-xl font-bold text-gray-900">Running Dashboard</span>
          </div>
          <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
        </div>
      </div>
    </nav>
  );
}