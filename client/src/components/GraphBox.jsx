import { memo, useEffect, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { DailyCommits, MonthlyCommits } from './Graphs';
import Loader from './Loader';
import useCommits from '../hooks/useCommits';

const GraphBox = memo(
  forwardRef(
    function GraphBox({ tabType, pkgData, period, setDialogOpen }, ref) {
      let alert;
      if (!pkgData?.owner) alert = 'No GitHub repo found';

      const { commits, isLoading, error, mutate } = useCommits(pkgData, period);

      useImperativeHandle(ref, () => ({ mutate }), [mutate]);

      useEffect(() => {
        if (error?.isTokenError) {
          setDialogOpen(true);
        }
      }, [error, setDialogOpen]);

      return (
        <div
          className={`h-35 sm:h-40 flex justify-center relative rounded-md ${
            isLoading ? 'shadow-xs items-center' : 'flex-col'
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : alert ? (
            <span className='absolute top-0'>{alert}</span>
          ) : error ? (
            <span className='absolute top-0'>{error.message}</span>
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
    (prevProps, nextProps) =>
      prevProps.tabType === nextProps.tabType &&
      prevProps.period === nextProps.period &&
      prevProps.pkgData?.name === prevProps.pkgData?.name
  )
);

GraphBox.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
  period: PropTypes.oneOfType([PropTypes.oneOf(['Current']), PropTypes.number]),
  setDialogOpen: PropTypes.func.isRequired,
};

export default GraphBox;
