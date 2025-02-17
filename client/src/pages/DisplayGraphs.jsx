import { BiSearchAlt } from 'react-icons/bi';
import { FaGithubAlt } from 'react-icons/fa6';
import { TbBrandNpm } from 'react-icons/tb';
import { SlGlobe } from 'react-icons/sl';
// import { DailyCommits } from '../components/Graphs';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';

function DisplayGraphs() {
  return (
    <>
      <Header>
        <h1 className='font-bold text-xl flex-col flex italic'>
          <span>Package</span>
          <span className='-mt-3 relative left-2'>Commits</span>
        </h1>
        <div className='flex gap-4 items-center'>
          <BiSearchAlt className='text-3xl' />
          <SearchBox variant='normal' />
        </div>
      </Header>
      <main className='mt-10 mx-auto max-w-4xl'>
        <div className='flex justify-between'>
          <div className='text-3xl'>
            <span className='font-bold'>react</span>
            <span>(19.alpha.1)</span>
          </div>
          <div className='flex text-2xl gap-3 items-end'>
            <FaGithubAlt />
            <TbBrandNpm />
            <SlGlobe />
          </div>
        </div>
        <p>React is a JavaScript library for creating user interfaces.</p>
        {/* <DailyCommits /> */}
      </main>
    </>
  );
}

export default DisplayGraphs;
