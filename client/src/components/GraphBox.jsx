import PropTypes from 'prop-types';
import { DailyCommits, MonthlyCommits } from './Graphs';
import useCommits from '../hooks/useCommits';

function GraphBox({ tabType, pkgData }) {
  const { data, isLoading, isError } = useCommits(pkgData);

  return (
    <>
      <div className={tabType !== 'daily' ? 'hidden' : ''}>
        <DailyCommits />
      </div>
      <div className={tabType !== 'monthly' ? 'hidden' : ''}>
        <MonthlyCommits />
      </div>
    </>
  );
}

GraphBox.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
};

export default GraphBox;
