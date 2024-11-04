import React from 'react';
import PropTypes from 'prop-types';

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import DaysText from './DaysText';
import WeeklyColumn from './WeeklyColumn';
import './DailyCommits.css';

import { calcDistribution } from '../utils/distribution';

const xStart = 0,
  yStart = 0,
  commitsXStart = 22,
  squareLength = 13,
  padding = 3,
  radius = 2,
  bottomSpace = 20,
  defaultColors = ['#eaeaea;', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Daily Commits Component for a single year */
function DailyCommits({ colors = defaultColors, weeklyCommits = [] }) {
  let totalWeeks = weeklyCommits?.length || 52;

  let columns = [],
    xPosition = commitsXStart;

  const bounds = calcDistribution(weeklyCommits);

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
      <svg
        className='daily-commits'
        height={(squareLength + padding) * daysArray.length + bottomSpace}
        width={commitsXStart + (squareLength + padding) * totalWeeks - padding}
      >
        <DaysText
          xStart={xStart}
          yStart={yStart}
          squareLength={squareLength}
          padding={padding}
          days={daysArray}
        />
        {columns}
      </svg>
    </TooltipProvider>
  );
}

DailyCommits.propTypes = {
  /** Set exactly 5 colors for the daily commits graph */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** Array containing all the commits of a package in a single year */
  weeklyCommits: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.string,
      commits: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default DailyCommits;
