import { memo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { DailyCommits, MonthlyCommits } from './Graphs';
import Loader from './Loader';
import type { TabTypes } from './ControlBtn';
import useCommits, { type Period } from '../hooks/useCommits';
import type { PackageData } from 'src/hooks/usePackage';

interface GraphBoxProps {
  tabType: TabTypes;
  pkgData?: PackageData;
  period?: Period;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const GraphBox = memo(
  forwardRef(function GraphBox(
    { tabType, pkgData, period, setDialogOpen }: GraphBoxProps,
    ref: React.Ref<{ mutate: () => void }>
  ) {
    // TODO: Throw errors in useSWR
    let alert: string | undefined;
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
  }),
  (prevProps, nextProps) =>
    prevProps.tabType === nextProps.tabType &&
    prevProps.period === nextProps.period &&
    prevProps.pkgData?.name === prevProps.pkgData?.name
);

export default GraphBox;
