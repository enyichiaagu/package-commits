import PropTypes from 'prop-types';

import MonthsText from './MonthsText';
import Square from './Square';

// function for calculating the month index using the week index
function calcMonthIndex(weekIndex, week) {
  if (!week && weekIndex % 4 === 0) {
    return weekIndex / 4;
  }
}

function WeeklyColumn({
  xPosition,
  squareLength,
  padding,
  radius,
  days,
  colors,
  weekIndex,
  week,
}) {
  let yPosition;

  let monthIndex = calcMonthIndex(weekIndex, week);

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
              bgColor={colors[0]}
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
  week: PropTypes.string,
};

export default WeeklyColumn;
