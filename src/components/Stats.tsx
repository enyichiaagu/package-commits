import { memo } from 'react';
import Contributors from './Contributors';
import useIssues from '../hooks/useIssues';
import type { PackageData } from 'src/hooks/usePackage';
import type { Period } from 'src/hooks/useCommits';

interface StatsProps {
  pkgData?: PackageData;
  period: Period;
}

const Stats = memo(
  function Stats({ pkgData, period }: StatsProps) {
    const { data, error } = useIssues(pkgData);

    return (
      <div className='mt-12 sm:mt-8 flex flex-col sm:flex-row items-center sm:justify-end gap-3 sm:gap-8'>
        <div className='flex gap-2 items-center'>
          {error ? (
            error.message
          ) : (
            <>
              <span
                className={`px-2 py-0.5 font-bold shadow-sm  ${
                  data <= 10
                    ? 'bg-green-100 text-green-700'
                    : data <= 30
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

export default Stats;
