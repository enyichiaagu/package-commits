import MonthsText from './MonthsText';
import Square from './Square';
import { addDay, type WeeklyCommits } from '../utils/mockCommits';

// function for calculating the month index using the week index
function calcMonthIndex(weekIndex: number, week: string) {
  if (!week && weekIndex % 4 === 0) {
    return weekIndex / 4;
  }
  let date = new Date(week).getUTCDate();
  let month = new Date(week).getUTCMonth();
  if (date <= 7) return month;
}

// function to find the index of the color in the palette
function getColorIndex(bounds: number[], dayCommit: number | null) {
  if (dayCommit === null) return -1;
  if (bounds.length === 0 || dayCommit === 0) return 0;

  for (let i = 0; i < bounds.length; i++) {
    if (dayCommit <= bounds[i]) return i + 1;
  }

  return 4;
}

// Transparent Color
let bgColor = '#ffffff00';

function formatDate(date: Date) {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getUTCDate();
  let suffix: string = 'th';

  if (day <= 3 || (day > 20 && day <= 23)) {
    const lastNum = day % 10;
    switch (lastNum) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
    }
  }

  return `${month} ${day}${suffix}`;
}

interface WeeklyColumnProps {
  xPosition: number;
  yPosition: number;
  squareLength: number;
  padding: number;
  radius: number;
  days: string[];
  colors: string[];
  weekIndex: number;
  weeklyCommits: WeeklyCommits;
  bounds: number[];
}

function WeeklyColumn({
  xPosition,
  yPosition,
  squareLength,
  padding,
  radius,
  days,
  colors,
  weekIndex,
  weeklyCommits,
  bounds,
}: WeeklyColumnProps) {
  let monthIndex = calcMonthIndex(weekIndex, weeklyCommits.week);
  let yPlacement: number = 0;

  return (
    <>
      <g>
        {days.map((_, index) => {
          yPlacement = (squareLength + padding) * index + yPosition;
          let displayDate = formatDate(addDay(weeklyCommits.week, index));
          let colorIndex = getColorIndex(bounds, weeklyCommits.commits[index]);
          let fillColor = colors[colorIndex] || bgColor;
          let strokeColor =
            colorIndex >= 0 ? (colorIndex > 0 ? colors.at(-1) : 'grey') : '';

          return (
            <Square
              key={index}
              xPosition={xPosition}
              yPosition={yPlacement}
              length={squareLength}
              radius={radius}
              commits={weeklyCommits.commits[index]}
              date={displayDate}
              bgColor={fillColor}
              strokeColor={strokeColor}
            />
          );
        })}
      </g>
      <MonthsText
        xPosition={xPosition}
        yPosition={yPlacement + squareLength + padding * 2}
        monthIndex={monthIndex}
      />
    </>
  );
}

export default WeeklyColumn;
