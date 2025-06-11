import { monthlyCommitsY } from '../utils/distribution';
import { squareLength } from '../utils/constants';

interface YAxisProps {
  height: number;
  topSpace: number;
  highestCommits: number;
  width: number;
}

function YAxis({ height, topSpace, highestCommits, width }: YAxisProps) {
  const yNumbers = monthlyCommitsY(highestCommits).sort((a, b) => a - b);
  let dividend = highestCommits <= 3 ? highestCommits : 4,
    xSpace = width - squareLength / 2,
    yPosition;

  return (
    <g>
      {yNumbers.map((value, index) => {
        yPosition = height - (index * height) / dividend;

        return (
          <text
            x={xSpace}
            y={yPosition + topSpace}
            dominantBaseline='mathematical'
            textAnchor='end'
            key={index}
          >
            {value}
          </text>
        );
      })}
    </g>
  );
}

export default YAxis;
