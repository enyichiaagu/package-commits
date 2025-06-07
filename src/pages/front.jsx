import Header from '../components/Header';
import SearchBox from '../components/SearchBox';

function Front() {
  return (
    <>
      <Header />
      <main className='flex-1 mx-4'>
        <div className='flex flex-col items-center mt-10 sm:mt-20'>
          <h1 className='font-bold italic text-3xl sm:text-5xl tracking-tight [word-spacing:-0.5rem]'>
            package commits
          </h1>
          <span className='text-center w-60 sm:w-full'>
            Check how frequently an npm package is maintained
          </span>
        </div>
        <div className='mt-10 max-w-lg mx-auto'>
          <SearchBox variant='front' />
        </div>
      </main>
    </>
  );
}

export default Front;
