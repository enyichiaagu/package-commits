import PropTypes from 'prop-types';

function Bars({
  xStart,
  yStart,
  minY,
  textY,
  barWidth,
  sidePadding,
  months,
  defaultColors,
}) {
  let xPosition;

  return (
    <>
      {months.map((month, index) => {
        xPosition = xStart + sidePadding + (barWidth + sidePadding) * index;
        return (
          <g key={index}>
            <SingleBar
              xPosition={xPosition}
              yPosition={yStart}
              width={barWidth}
              height={minY}
              fill={defaultColors[3]}
            />
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

function SingleBar({ xPosition, yPosition, width, height, fill }) {
  return (
    <rect
      x={xPosition}
      y={yPosition}
      width={width}
      height={height}
      fill={fill}
    ></rect>
  );
}

Bars.propTypes = {
  monthlyCommits: PropTypes.object,
};

export default Bars;
