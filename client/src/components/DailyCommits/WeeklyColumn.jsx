import PropTypes from 'prop-types';

import Square from './Square';

// const months = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

function WeeklyColumn({
  xPosition,
  yStart,
  squareLength,
  padding,
  radius,
  days,
  colors,
}) {
  let yPosition;
  return (
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
  );
}

export default WeeklyColumn;
