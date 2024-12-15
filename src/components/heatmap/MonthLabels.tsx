import React from 'react';
import { format } from 'date-fns';

interface Props {
  currentYear: number;
}

export function MonthLabels({ currentYear }: Props) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYear, i, 1));

  return (
    <div className="flex justify-between px-8 mb-2">
      {months.map((date) => (
        <div key={date.getMonth()} className="text-sm text-gray-500">
          {format(date, 'MMM')}
        </div>
      ))}
    </div>
  );
}