import React from 'react';
import SquareSvg from './SquareSvg';
import MonthPlacement from './MonthPlacement';

import { weekShade } from '../../hooks/utils';

const fillColor = ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];

function WeeklyColumn({
  xPosition,
  yStart,
  squareLength,
  padding,
  radius,
  numOfDays,
  commits,
  week,
  quartiles,
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
        bgColor={
          commits ? fillColor[weekShade(commits[i], quartiles)] : fillColor[0]
        }
      />
    );
    yPosition += squareLength + padding;
  }

  return (
    <>
      <g>{squares}</g>
      {new Date(week).getUTCDate() <= numOfDays && (
        <MonthPlacement
          xPosition={xPosition}
          yPosition={yPosition}
          monthIndex={new Date(week).getUTCMonth()}
        />
      )}
    </>
  );
}

export default WeeklyColumn;
