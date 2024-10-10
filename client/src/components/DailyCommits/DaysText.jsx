import PropTypes from 'prop-types';

function DaysText({ xStart, yStart, squareLength, padding, days }) {
  return (
    <g>
      {days.map((day, index) => {
        return (
          index % 2 !== 0 && (
            <text
              x={xStart}
              y={yStart + (squareLength + padding) * index + squareLength / 2}
              dominantBaseline='middle'
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

DaysText.propTypes = {
  xStart: PropTypes.number.isRequired,
  yStart: PropTypes.number.isRequired,
  squareLength: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DaysText;
