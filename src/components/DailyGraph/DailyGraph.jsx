import React from 'react';
import DaysPlacement from './DaysPlacement';
import WeeklyColumn from './WeeklyColumn';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function DailyGraph({ weeks, xStart, yStart, squareLength, padding, radius }) {
  const columns = [];
  let xPosition = xStart;

  for (let i = 0; i < weeks; i++) {
    columns.push(
      <WeeklyColumn
        key={i}
        xPosition={xPosition}
        yStart={yStart}
        squareLength={squareLength}
        padding={padding}
        radius={radius}
        numOfDays={days.length}
      />
    );
    xPosition += squareLength + padding;
  }

  return (
    <svg
      height={(squareLength + padding) * days.length - padding}
      width={xStart + (squareLength + padding) * weeks - padding}
    >
      <DaysPlacement
        days={days}
        squareLength={squareLength}
        padding={padding}
        yStart={yStart}
      />
      {columns}
    </svg>
  );
}

export default DailyGraph;
