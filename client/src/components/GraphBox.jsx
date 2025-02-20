import PropTypes from 'prop-types';
import { DailyCommits, MonthlyCommits } from './Graphs';

function GraphBox({ tabType }) {
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
};

export default GraphBox;
