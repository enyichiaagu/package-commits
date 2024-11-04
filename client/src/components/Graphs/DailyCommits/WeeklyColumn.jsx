import PropTypes from 'prop-types';
import MonthsText from './MonthsText';
import Square from './Square';
import { addDay } from '../utils/mockCommits';

// function for calculating the month index using the week index
function calcMonthIndex(weekIndex, week) {
  if (!week && weekIndex % 4 === 0) {
    return weekIndex / 4;
  }
  let date = new Date(week).getUTCDate();
  let month = new Date(week).getUTCMonth();
  if (date <= 7) return month;
}

function colorIndex(bounds, dayCommit) {
  if (dayCommit === null) return -1;
  if (bounds.length === 0 || dayCommit === 0) return 0;
  if (dayCommit <= bounds[0]) return 1;
  if (dayCommit <= bounds[1]) return 2;
  if (dayCommit <= bounds[2]) return 3;
  return 4;
}

let bgColor = '#ffffff00';

function formatDate(date) {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getUTCDate();
  let suffix;

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
  } else {
    suffix = 'th';
  }

  return `${month} ${day}${suffix}`;
}

function WeeklyColumn({
  xPosition,
  squareLength,
  padding,
  radius,
  days,
  colors,
  weekIndex,
  weeklyCommits,
  bounds,
}) {
  let yPosition;

  let monthIndex = calcMonthIndex(weekIndex, weeklyCommits.week);

  let displayDate;

  return (
    <>
      <g>
        {days.map((_, index) => {
          yPosition = (squareLength + padding) * index;
          displayDate = formatDate(addDay(weeklyCommits.week, index));

          return (
            <Square
              key={index}
              xPosition={xPosition}
              yPosition={yPosition}
              length={squareLength}
              padding={padding}
              radius={radius}
              commits={weeklyCommits.commits[index]}
              date={displayDate}
              bgColor={
                colors[colorIndex(bounds, weeklyCommits.commits[index])] ||
                bgColor
              }
            />
          );
        })}
      </g>
      <MonthsText
        xPosition={xPosition}
        yPosition={yPosition + squareLength + padding}
        monthIndex={monthIndex}
      />
    </>
  );
}

WeeklyColumn.propTypes = {
  xPosition: PropTypes.number.isRequired,
  squareLength: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  weekIndex: PropTypes.number.isRequired,
  weeklyCommits: PropTypes.object,
  bounds: PropTypes.arrayOf(PropTypes.number),
};

export default WeeklyColumn;
