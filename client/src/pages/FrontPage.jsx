import Header from '../components/Header';
import SearchBox from '../components/SearchBox';

function FrontPage() {
  return (
    <>
      <Header />
      <main className='flex-1 mx-4'>
        <div className='flex flex-col items-center mt-10 sm:mt-20'>
          <h1 className='font-bold italic text-3xl sm:text-5xl tracking-tight [word-spacing:-0.5rem]'>
            package commits
          </h1>
          <span className='text-center w-60 sm:w-full'>
            Check how frequently an NPM package is maintained
          </span>
        </div>
        <div className='mt-10 flex justify-center'>
          <SearchBox variant='front' />
        </div>
      </main>
    </>
  );
}

export default FrontPage;
