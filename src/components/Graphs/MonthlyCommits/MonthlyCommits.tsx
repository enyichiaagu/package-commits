import { memo } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import YAxis from './YAxis';
import Bars from './Bars';

// TODO: Replace these with a class
import {
  xStart,
  daysWidth,
  bottomSpace,
  topSpace,
  padding,
  barLeftPadding,
  barWidth,
  defaultColors,
  MONTHS,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from '../utils/constants';
import { weeklyToMonthlyCommits } from '../utils/distribution';
import { genMockCommits, type WeeklyCommits } from '../utils/mockCommits';

interface MonthlyCommitsProps {
  weeklyCommits: WeeklyCommits[];
}

const MonthlyCommits = memo(
  function MonthlyCommits({
    weeklyCommits = genMockCommits(5),
  }: MonthlyCommitsProps) {
    const monthsArr = weeklyToMonthlyCommits(weeklyCommits, MONTHS);
    const highestCommits = Math.max(...monthsArr.map((arr) => arr.commits));

    return (
      <TooltipProvider>
        <div className='monthly-commits' style={{ maxHeight: GRAPH_HEIGHT }}>
          <svg height={GRAPH_HEIGHT} width={daysWidth} className='y-placement'>
            <YAxis
              height={GRAPH_HEIGHT - bottomSpace - topSpace}
              width={daysWidth}
              topSpace={topSpace}
              highestCommits={highestCommits}
            />
          </svg>
          <div
            className='contributions'
            style={{ width: `calc(100% - ${daysWidth}px)` }}
          >
            <svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH}>
              <Bars
                xStart={xStart}
                yStart={topSpace}
                minY={GRAPH_HEIGHT - bottomSpace - topSpace}
                textY={GRAPH_HEIGHT - bottomSpace + padding * 2}
                barWidth={barWidth}
                monthsArr={monthsArr}
                highestCommits={highestCommits}
                sidePadding={barLeftPadding}
                defaultColors={defaultColors}
              />
            </svg>
          </div>
        </div>
      </TooltipProvider>
    );
  },
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) return true;
    return false;
  }
);

export default MonthlyCommits;
