import { memo } from 'react';
import PropTypes from 'prop-types';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import DaysText from './DaysText';
import WeeklyColumn from './WeeklyColumn';

import { calcDistribution } from '../utils/distribution';
import { genMockCommits } from '../utils/mockCommits';

const xStart = 0,
  yStart = 0,
  daysWidth = 25,
  squareLength = 13,
  padding = 3,
  radius = 2,
  bottomSpace = 20,
  defaultColors = ['#eaeaea', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Set height of the component once
const GRAPH_HEIGHT = (squareLength + padding) * daysArray.length + bottomSpace;

/** Daily Commits Component for a single year */
const DailyCommits = memo(function DailyCommits({
  colors = defaultColors,
  weeklyCommits = genMockCommits(0),
}) {
  let totalWeeks = weeklyCommits?.length || 52;

  let columns = [],
    xPosition = daysWidth;

  const bounds = calcDistribution(weeklyCommits);

  // Set width of contributions svg
  const contributionsWidth =
    daysWidth + (squareLength + padding) * totalWeeks - padding;

  // Loop to generate the weekly columns in the graph
  for (let i = 0; i < totalWeeks; i++) {
    columns.push(
      <WeeklyColumn
        key={i}
        xPosition={xPosition}
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
      <div className='daily-commits'>
        <svg height={GRAPH_HEIGHT} width={daysWidth} className='days-placement'>
          <DaysText
            xStart={xStart}
            yStart={yStart}
            squareLength={squareLength}
            padding={padding}
            days={daysArray}
          />
        </svg>
        <div className='contributions'>
          <svg height={GRAPH_HEIGHT} width={contributionsWidth}>
            {columns}
          </svg>
        </div>
      </div>
    </TooltipProvider>
  );
});

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
