import * as Tooltip from '@radix-ui/react-tooltip';

interface SquareProps {
  xPosition: number;
  yPosition: number;
  length: number;
  radius: number;
  commits: number | null;
  date: string;
  bgColor: string;
  strokeColor?: string;
}

function Square({
  xPosition,
  yPosition,
  length,
  radius,
  commits,
  date,
  bgColor,
  strokeColor,
}: SquareProps) {
  const squareRect = (
    <rect
      x={xPosition}
      y={yPosition}
      width={length}
      height={length}
      rx={radius}
      ry={radius}
      fill={bgColor}
      stroke={strokeColor}
      strokeWidth={0.05}
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

export default Square;
