import { memo } from 'react';
import PropTypes from 'prop-types';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import DaysText from './DaysText';
import WeeklyColumn from './WeeklyColumn';

import {
  xStart,
  daysWidth,
  squareLength,
  padding,
  radius,
  topSpace,
  defaultColors,
  daysArray,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
} from '../utils/constants';
import { calcDistribution } from '../utils/distribution';
import { genMockCommits } from '../utils/mockCommits';

/** Daily Commits Component for a single year */
const DailyCommits = memo(
  function DailyCommits({
    colors = defaultColors,
    weeklyCommits = genMockCommits(0),
  }) {
    let totalWeeks = weeklyCommits.length;

    let columns = [],
      xPosition = xStart;

    const bounds = calcDistribution(weeklyCommits);

    // Loop to generate the weekly columns in the graph
    for (let i = 0; i < totalWeeks; i++) {
      columns.push(
        <WeeklyColumn
          key={i}
          xPosition={xPosition}
          yPosition={topSpace}
          squareLength={squareLength}
          padding={padding}
          radius={radius}
          days={daysArray}
          colors={colors}
          weekIndex={i}
          weeklyCommits={weeklyCommits[i]}
          bounds={bounds}
        />
      );
      xPosition += squareLength + padding;
    }

    return (
      <TooltipProvider>
        <div className='daily-commits' style={{ maxHeight: GRAPH_HEIGHT }}>
          <svg
            height={GRAPH_HEIGHT}
            width={daysWidth}
            className='days-placement'
          >
            <DaysText
              xStart={daysWidth - squareLength / 2}
              yStart={topSpace}
              squareLength={squareLength}
              padding={padding}
              days={daysArray}
            />
          </svg>
          <div
            className='contributions'
            style={{ width: `calc(100% - ${daysWidth}px)` }}
          >
            <svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH}>
              {columns}
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

DailyCommits.propTypes = {
  /** Set exactly 5 colors for the daily commits graph */
  colors: PropTypes.arrayOf(PropTypes.string),

  /** Array containing all the commits of a package in a single year */
  weeklyCommits: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.string,
      commits: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default DailyCommits;
