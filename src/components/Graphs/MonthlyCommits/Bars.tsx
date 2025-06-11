import type { MonthlyCommits } from '../utils/distribution';

interface BarsProps {
  xStart: number;
  yStart: number;
  minY: number;
  textY: number;
  barWidth: number;
  sidePadding: number;
  monthsArr: MonthlyCommits[];
  highestCommits: number;
  defaultColors: string[];
}

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
}: BarsProps) {
  let xPosition, yPosition, height, fraction;

  return (
    <>
      {monthsArr
        .toSorted((a, b) => a.id - b.id)
        .map(({ month, commits }, index) => {
          xPosition = xStart + sidePadding + (barWidth + sidePadding) * index;
          fraction = commits / highestCommits;
          yPosition = yStart + (1 - fraction) * minY;
          height = fraction * minY;

          return (
            <g key={index}>
              {fraction && (
                <rect
                  x={xPosition}
                  y={yPosition}
                  width={barWidth}
                  height={height}
                  fill={defaultColors[3]}
                ></rect>
              )}
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

export default Bars;
