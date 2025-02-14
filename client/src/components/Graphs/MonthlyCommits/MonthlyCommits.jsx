import React from 'react';
import PropTypes from 'prop-types';
import YAxis from './YAxis';
import {
  daysWidth,
  GRAPH_HEIGHT,
  xStart,
  bottomSpace,
  topSpace,
} from '../utils/constants';

function MonthlyCommits({ highestCommits }) {
  return (
    <div className='monthly-commits'>
      <svg height={GRAPH_HEIGHT} width={daysWidth} className='days-placement'>
        <YAxis
          height={GRAPH_HEIGHT - bottomSpace - topSpace}
          xStart={xStart}
          topSpace={topSpace}
          highestCommits={highestCommits}
        />
      </svg>
      <div>{/* <svg></svg> */}</div>
    </div>
  );
}

MonthlyCommits.propTypes = {
  weeklyCommits: PropTypes.arrayOf(
    PropTypes.exact({
      week: PropTypes.string,
      commits: PropTypes.arrayOf(PropTypes.number),
    })
  ),
};

export default MonthlyCommits;
