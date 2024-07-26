import React from 'react';
import SquareSvg from './SquareSvg';

const fillColor = '#2CA05A';

function WeeklyColumn({
  xPosition,
  yStart,
  squareLength,
  padding,
  radius,
  numOfDays,
}) {
  let squares = [],
    yPosition = yStart;

  for (let i = 0; i < numOfDays; i++) {
    squares.push(
      <SquareSvg
        key={i}
        xPosition={xPosition}
        yPosition={yPosition}
        length={squareLength}
        radius={radius}
        bgColor={fillColor}
      />
    );
    yPosition += squareLength + padding;
  }

  return <g>{squares}</g>;
}

export default WeeklyColumn;
