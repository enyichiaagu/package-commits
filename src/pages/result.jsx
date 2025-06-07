import { useState, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import usePackage from '../hooks/usePackage';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import PackageTitle from '../components/PackageTitle';
import GraphControls from '../components/GraphControls';
import GraphBox from '../components/GraphBox';
import Stats from '../components/Stats';
import TokenDialog from '../components/TokenDialog';

function Result() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [period, setPeriod] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const refresh = useRef(null);

  const { '*': pkg } = params;
  const { pkgData, isLoading, error } = usePackage(pkg);
  const tabType = searchParams.get('tab') || 'daily';

  return (
    <>
      <Header>
        <Link to='/' className='order-1'>
          <h1 className='font-bold text-2xl tracking-tight [word-spacing:-0.5rem] sm:flex-col sm:flex italic'>
            <span>package</span>{' '}
            <span className='sm:-mt-[0.9rem] relative sm:left-1.5'>
              commits
            </span>
          </h1>
        </Link>
        <div className='flex items-center order-3 sm:order-2 col-span-full sm:col-span-1 sm:max-w-lg'>
          <SearchBox variant='normal' pkg={pkg} />
        </div>
      </Header>
      <main className='mt-5 sm:mt-10 mx-auto px-4 max-w-240'>
        <>
          {isLoading && 'Loading...'}
          {!isLoading &&
            (error ? error.message : <PackageTitle pkgData={pkgData} />)}
        </>
        {!error && (
          <>
            <GraphControls
              tabType={tabType}
              pkgData={pkgData}
              setPeriod={setPeriod}
              setDialogOpen={setDialogOpen}
              ref={refresh}
            />
            <GraphBox
              tabType={tabType}
              pkgData={pkgData}
              period={period}
              setDialogOpen={setDialogOpen}
              ref={refresh}
            />
            <Stats pkgData={pkgData} period={period} />
          </>
        )}
      </main>
      <TokenDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        refresh={refresh}
      />
    </>
  );
}

export default Result;
