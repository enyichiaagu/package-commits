import { MONTHS } from '../utils/constants';

interface MonthsTextProps {
  xPosition: number;
  yPosition: number;
  monthIndex?: number;
}

function MonthsText({ xPosition, yPosition, monthIndex }: MonthsTextProps) {
  return (
    <g>
      <text
        x={xPosition}
        y={yPosition}
        dominantBaseline='hanging'
        className='text'
      >
        {MONTHS[monthIndex ?? -1]}
      </text>
    </g>
  );
}

export default MonthsText;
