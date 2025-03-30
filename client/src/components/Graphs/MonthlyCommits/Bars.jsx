import PropTypes from 'prop-types';

function Bars({
  xStart,
  yStart,
  minY,
  textY,
  barWidth,
  sidePadding,
  monthsArr,
  highestCommits,
  defaultColors,
}) {
  let xPosition, yPosition, height, fraction;

  return (
    <>
      {monthsArr.map(({ id, month, commits }, index) => {
        xPosition = xStart + sidePadding + (barWidth + sidePadding) * index;
        fraction = commits / highestCommits;
        yPosition = yStart + (1 - fraction) * minY;
        height = fraction * minY;

        return (
          <g key={index}>
            <rect
              x={xPosition}
              y={yPosition}
              width={barWidth}
              height={height}
              fill={defaultColors[3]}
            ></rect>
            <text
              x={xPosition + barWidth / 2}
              y={textY}
              textAnchor='middle'
              dominantBaseline='hanging'
            >
              {month}
            </text>
          </g>
        );
      })}
    </>
  );
}

Bars.propTypes = {
  xStart: PropTypes.number.isRequired,
  yStart: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  textY: PropTypes.number.isRequired,
  barWidth: PropTypes.number.isRequired,
  sidePadding: PropTypes.number.isRequired,
  monthsArr: PropTypes.array.isRequired,
  highestCommits: PropTypes.number.isRequired,
  defaultColors: PropTypes.arrayOf(PropTypes.string),
};

export default Bars;
