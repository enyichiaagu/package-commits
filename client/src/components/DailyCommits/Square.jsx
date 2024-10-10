import PropTypes from 'prop-types';

function Square({ xPosition, yPosition, length, radius, bgColor }) {
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

Square.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  bgColor: PropTypes.string,
};

export default Square;
