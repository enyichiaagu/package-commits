import { BiSearchAlt } from 'react-icons/bi';
import { DailyCommits, MonthlyCommits } from '../components/Graphs';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import PackageTitle from '../components/PackageTitle';
import GraphControls from '../components/GraphControls';

function DisplayGraphs() {
  return (
    <>
      <Header>
        <h1 className='font-bold text-xl flex-col flex italic'>
          <span>Package</span>
          <span className='-mt-3 relative left-2'>Commits</span>
        </h1>
        <div className='flex gap-4 items-center'>
          {/* TODO: Remove this to use downshift functionality */}
          <BiSearchAlt className='text-3xl' />
          <SearchBox variant='normal' />
        </div>
      </Header>
      <main className='mt-10 mx-auto max-w-4xl'>
        <PackageTitle />
        <GraphControls />
        <DailyCommits />
        {/* <MonthlyCommits /> */}
        <span className='block text-right mt-8'>300 contributors</span>
      </main>
    </>
  );
}

export default DisplayGraphs;
