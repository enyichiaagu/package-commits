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
        x={xPosition}
        y={yPosition}
        dominantBaseline='hanging'
        className='text'
      >
        {/* Making sure month index is a number before displaying */}
        {!isNaN(monthIndex) && months[monthIndex]}
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
