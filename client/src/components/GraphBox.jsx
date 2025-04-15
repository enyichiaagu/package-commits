import { memo } from 'react';
import PropTypes from 'prop-types';
import { DailyCommits, MonthlyCommits } from './Graphs';
import Loader from './Loader';
import useCommits from '../hooks/useCommits';

const GraphBox = memo(
  function GraphBox({ tabType, pkgData, period }) {
    const { commits, isLoading, isError } = useCommits(pkgData, period);

    return (
      <div
        className={`h-35 sm:h-40 flex justify-center ${
          isLoading ? 'shadow-xs rounded-md items-center' : 'flex-col'
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={`${tabType !== 'daily' ? 'hidden' : 'block'}`}>
              <DailyCommits weeklyCommits={commits} />
            </div>
            <div className={`${tabType !== 'monthly' ? 'hidden' : 'block'}`}>
              <MonthlyCommits weeklyCommits={commits} />
            </div>
          </>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) return true;
    return false;
  }
);

GraphBox.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
  period: PropTypes.oneOfType([PropTypes.oneOf(['Current']), PropTypes.number]),
};

export default GraphBox;
