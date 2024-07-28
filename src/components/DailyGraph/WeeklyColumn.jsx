import React from 'react';
import SquareSvg from './SquareSvg';

const fillColor = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];

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
        bgColor={fillColor[2]}
      />
    );
    yPosition += squareLength + padding;
  }

  return <g>{squares}</g>;
}

export default WeeklyColumn;
