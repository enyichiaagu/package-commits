import PropTypes from 'prop-types';
import { DailyCommits, MonthlyCommits } from './Graphs';
import Loader from './Loader';
import useCommits from '../hooks/useCommits';

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
          <div className={`${tabType !== 'daily' ? 'hidden' : ''}`}>
            <DailyCommits weeklyCommits={commits} />
          </div>
          <div className={`${tabType !== 'monthly' ? 'hidden' : ''}`}>
            <MonthlyCommits weeklyCommits={commits} />
          </div>
        </>
      )}
    </div>
  );
}

GraphBox.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
  period: PropTypes.oneOfType([PropTypes.oneOf(['Current']), PropTypes.number]),
};

export default GraphBox;
