import { memo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';
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
        <Link to='/'>
          <h1 className='font-bold text-xl flex-col flex italic'>
            <span>Package</span>
            <span className='-mt-3 relative left-2'>Commits</span>
          </h1>
        </Link>
        <div className='flex gap-4 items-center'>
          {/* TODO: Remove this to use downshift functionality */}
          <BiSearchAlt className='text-3xl' />
          <SearchBox variant='normal' pkg={pkg} />
        </div>
      </Header>
      <main className='mt-10 mx-auto max-w-4xl'>
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
