import PropTypes from 'prop-types';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function MonthsText({ xPosition, yPosition, monthIndex }) {
  return (
    <g>
      <text
        xPosition={xPosition}
        y={yPosition}
        dominantBaseline='hanging'
        className='text'
      >
        {monthIndex && months[monthIndex]}
      </text>
    </g>
  );
}

MonthsText.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  monthIndex: PropTypes.number,
};

export default MonthsText;
