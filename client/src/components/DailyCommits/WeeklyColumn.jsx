import PropTypes from 'prop-types';

import MonthsText from './MonthsText';
import Square from './Square';

function WeeklyColumn({
  xPosition,
  squareLength,
  padding,
  radius,
  days,
  colors,
}) {
  let yPosition;
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
      <g></g>
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
};

export default WeeklyColumn;
