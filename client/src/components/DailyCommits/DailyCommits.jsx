import React from 'react';
import PropTypes from 'prop-types';

import DaysText from './DaysText';
import './DailyCommits.css';

const totalWeeks = 53,
  xStart = 0,
  yStart = 0,
  commitsXStart = 20,
  squareLength = 12,
  padding = 5,
  radius = 5,
  bottomSpace = 50,
  daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  defaultColors = ['#f9f9f9', '#87deaa', '#5fd38d', '#217844', '#0b2817'];

let columns = [];

/** Daily Commits Component for a single year */
function DailyCommits({ colors = defaultColors, commits }) {
  // Loop to generate the weekly columns in the graph
  for (let i = 0; i < totalWeeks; i++) {
    columns.push();
  }

  return (
    <svg
      className='daily-commits'
      height={
        (squareLength + padding) * daysArray.length + bottomSpace - padding
      }
      width={commitsXStart + (squareLength + padding) * totalWeeks - padding}
    >
      <DaysText
        xStart={xStart}
        yStart={yStart}
        squareLength={squareLength}
        padding={padding}
        days={daysArray}
      />
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
