import { memo } from 'react';
import PropTypes from 'prop-types';
import Contributors from './Contributors';
import useIssues from '../hooks/useIssues';

const Stats = memo(
  function Stats({ pkgData, period }) {
    const { data, error } = useIssues(pkgData);

    return (
      <div className='mt-8 flex sm:justify-end sm:gap-8'>
        <div className='flex gap-2 items-center'>
          {error ? (
            error.message
          ) : (
            <>
              <span
                className={`px-2 py-0.5 font-bold shadow-sm  ${
                  data <= 5
                    ? 'bg-green-100 text-green-700'
                    : data <= 20
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-500'
                }`}
              >
                {data}%
              </span>
              <span className=''>unresolved issues</span>
            </>
          )}
        </div>
        <Contributors pkgData={pkgData} period={period} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) return true;
    return false;
  }
);

Stats.propTypes = {
  pkgData: PropTypes.object,
  period: PropTypes.oneOfType([PropTypes.oneOf(['Current']), PropTypes.number]),
};

export default Stats;
