import { daysArray } from '../utils/constants';

interface DaysTextProps {
  xStart: number;
  yStart: number;
  squareLength: number;
  padding: number;
  days: typeof daysArray;
}

function DaysText({
  xStart,
  yStart,
  squareLength,
  padding,
  days,
}: DaysTextProps) {
  return (
    <g>
      {days.map((day, index) => {
        return (
          index % 2 !== 0 && (
            <text
              x={xStart}
              y={yStart + (squareLength + padding) * index + squareLength / 2}
              dominantBaseline='mathematical'
              textAnchor='end'
              key={index}
              className='text'
            >
              {day}
            </text>
          )
        );
      })}
    </g>
  );
}

export default DaysText;
