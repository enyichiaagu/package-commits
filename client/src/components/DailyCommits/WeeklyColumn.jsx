import PropTypes from 'prop-types';

import MonthsText from './MonthsText';
import Square from './Square';

// function for calculating the month index using the week index
function calcMonthIndex(weekIndex, week) {
  if (!week && weekIndex % 4 === 0) {
    return weekIndex / 4;
  }
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
  // colors[colorIndex(bounds, weeklyCommits.commits[index])]
  // console.log(bounds, weeklyCommits.commits);

  return (
    <>
      <g>
        {days.map((day, index) => {
          yPosition = (squareLength + padding) * index;
          return (
            <Square
              key={index}
              xPosition={xPosition}
              yPosition={yPosition}
              length={squareLength}
              padding={padding}
              radius={radius}
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
  bounds: PropTypes.arrayOf(PropTypes.number),
};

export default WeeklyColumn;
