import React from 'react';
import PropTypes from 'prop-types';

import DaysText from './DaysText';
import WeeklyColumn from './WeeklyColumn';
import './DailyCommits.css';

const totalWeeks = 53,
  xStart = 0,
  yStart = 0,
  commitsXStart = 22,
  squareLength = 13,
  padding = 3,
  radius = 2,
  bottomSpace = 20,
  defaultColors = ['#e6e6e6', '#87deaa', '#5fd38d', '#217844', '#0b2817'],
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Daily Commits Component for a single year */
function DailyCommits({ colors = defaultColors, commits }) {
  let columns = [],
    xPosition = commitsXStart;

  // Loop to generate the weekly columns in the graph
  for (let i = 0; i < totalWeeks; i++) {
    columns.push(
      <WeeklyColumn
        key={i}
        xPosition={xPosition}
        yStart={yStart}
        squareLength={squareLength}
        padding={padding}
        radius={radius}
        days={daysArray}
        colors={defaultColors}
      />
    );
    xPosition += squareLength + padding;
  }

  return (
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
  );
}

DailyCommits.propTypes = {
  /** Set exactly 5 colors for the daily commits graph */
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** Array containing all the commits of a package in a single year */
  commits: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.string,
      commits: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default DailyCommits;
