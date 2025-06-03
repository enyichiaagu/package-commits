import PropTypes from 'prop-types';
import { MONTHS } from '../utils/constants';

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
        {!isNaN(monthIndex) && MONTHS[monthIndex]}
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
