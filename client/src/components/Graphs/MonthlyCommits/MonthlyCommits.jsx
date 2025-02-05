import React from 'react';
import PropTypes from 'prop-types';

// TODO: Remember to remove tooltip provider

function MonthlyCommits({ weeklyCommits = [] }) {
  return <></>;
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
