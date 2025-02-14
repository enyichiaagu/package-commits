import PropTypes from 'prop-types';
import { monthlyCommitsY } from '../utils/distribution';

function YAxis({ xStart, height, topSpace, highestCommits }) {
  const yNumbers = monthlyCommitsY(highestCommits).sort((a, b) => a - b);
  let dividend = highestCommits <= 3 ? highestCommits : 4,
    yPosition;

  return (
    <g>
      {yNumbers.map((value, index) => {
        yPosition = height - (index * height) / dividend;

        return (
          <text
            x={xStart}
            y={yPosition + topSpace}
            dominantBaseline='middle'
            key={index}
          >
            {value}
          </text>
        );
      })}
    </g>
  );
}

YAxis.propTypes = {
  xStart: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topSpace: PropTypes.number.isRequired,
  highestCommits: PropTypes.number.isRequired,
};

export default YAxis;
