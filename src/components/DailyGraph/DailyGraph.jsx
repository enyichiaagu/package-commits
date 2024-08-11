import { quarts } from '../../hooks/utils.js';
import DaysPlacement from './DaysPlacement';
import WeeklyColumn from './WeeklyColumn';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DailyGraph({
  weeks,
  xStart,
  yStart,
  squareLength,
  padding,
  radius,
  commits,
}) {
  const columns = [];
  let xPosition = xStart;

  let quartiles = quarts(commits.map((week) => week.days));

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
        commits={commits[i]?.days}
        week={commits[i]?.week}
        quartiles={quartiles}
      />
    );
    xPosition += squareLength + padding;
  }

  return (
    <svg
      height={(squareLength + padding) * days.length + 100}
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
