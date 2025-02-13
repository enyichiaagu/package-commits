import React from 'react';
import PropTypes from 'prop-types';

// TODO: Remember to remove tooltip provider

function MonthlyCommits({}) {
  return (
    <div className='monthly-commits'>
      <svg></svg>
      <div>
        <svg></svg>
      </div>
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
