import React from 'react';

function SquareSvg({ xPosition, yPosition, length, radius, bgColor }) {
  return (
    <rect
      x={xPosition}
      y={yPosition}
      width={length}
      height={length}
      rx={radius}
      ry={radius}
      fill={bgColor}
    ></rect>
  );
}

export default SquareSvg;
