import { memo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import PackageTitle from '../components/PackageTitle';
import GraphControls from '../components/GraphControls';
import usePackage from '../hooks/usePackage';
import GraphBox from '../components/GraphBox';

function DisplayGraphs() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { '*': pkg } = params;
  const { pkgData, isLoading, isError } = usePackage(pkg);
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
        <div className='flex gap-4 items-center order-3 sm:order-2 col-span-full sm:col-span-1'>
          <SearchBox variant='normal' pkg={pkg} />
        </div>
      </Header>
      <main className='mt-5 sm:mt-10 mx-auto px-4 max-w-240'>
        <PackageTitle pkgData={pkgData} />
        <GraphControls tabType={tabType} pkgData={pkgData} />
        <GraphBox tabType={tabType} pkgData={pkgData} />
        {/* Change this to maintainers for now */}
        <span className='block text-right mt-8'>300 contributors</span>
      </main>
    </>
  );
}

export default DisplayGraphs;
