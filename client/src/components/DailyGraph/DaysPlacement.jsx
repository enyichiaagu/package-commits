function DaysPlacement({ yStart, squareLength, padding, days }) {
  let xPosition = 0;

  return (
    <g>
      {days.map((day, index) => {
        return (
          index % 2 !== 0 && (
            <text
              x={xPosition}
              y={yStart + (squareLength + padding) * index + squareLength / 2}
              dominantBaseline='middle'
              key={index}
              fontFamily='Consolas, sans serif'
              fontSize='0.8rem'
            >
              {day}
            </text>
          )
        );
      })}
    </g>
  );
}

export default DaysPlacement;
