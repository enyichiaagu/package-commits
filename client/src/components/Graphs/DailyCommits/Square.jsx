import * as Tooltip from '@radix-ui/react-tooltip';
import PropTypes from 'prop-types';

function Square({
  xPosition,
  yPosition,
  length,
  radius,
  commits,
  date,
  bgColor,
}) {
  const squareRect = (
    <rect
      x={xPosition}
      y={yPosition}
      width={length}
      height={length}
      rx={radius}
      ry={radius}
      fill={bgColor}
      className='day'
    ></rect>
  );

  if (!commits) return squareRect;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{squareRect}</Tooltip.Trigger>
      <Tooltip.TooltipPortal>
        <Tooltip.Content className='TooltipContent'>
          {`${commits} commit${commits !== 1 ? 's' : ''} on ${date}`}
        </Tooltip.Content>
      </Tooltip.TooltipPortal>
    </Tooltip.Root>
  );
}

Square.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  commits: PropTypes.number,
  date: PropTypes.string,
  bgColor: PropTypes.string,
};

export default Square;
