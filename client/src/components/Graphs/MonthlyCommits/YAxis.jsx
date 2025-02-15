import PropTypes from 'prop-types';
import { monthlyCommitsY } from '../utils/distribution';

function YAxis({ height, topSpace, highestCommits, width }) {
  const yNumbers = monthlyCommitsY(highestCommits).sort((a, b) => a - b);
  let dividend = highestCommits <= 3 ? highestCommits : 4,
    xSpace = width,
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

YAxis.propTypes = {
  height: PropTypes.number.isRequired,
  topSpace: PropTypes.number.isRequired,
  highestCommits: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default YAxis;
