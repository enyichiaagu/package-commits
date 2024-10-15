import * as Tooltip from '@radix-ui/react-tooltip';
import PropTypes from 'prop-types';

function Square({ xPosition, yPosition, length, radius, commits, bgColor }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
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
      </Tooltip.Trigger>
      <Tooltip.TooltipPortal>
        <Tooltip.Content className='TooltipContent'>
          {`${commits} commit${commits !== 1 ? 's' : ''}`}
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
  bgColor: PropTypes.string,
};

export default Square;
