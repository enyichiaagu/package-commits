import Header from '../components/Header';

function FrontPage() {
  return (
    <>
      <Header />
      <main className='flex-1'>
        <div className='flex flex-col items-center mx-2 mt-10 sm:mt-20'>
          <span className='font-bold italic text-3xl sm:text-5xl'>
            package commits
          </span>
          <span className='text-center'>
            Check how frequently an NPM package is maintained
          </span>
        </div>
        <div className='mt-10 text-center'>
          <input></input>
        </div>
      </main>
    </>
  );
}

export default FrontPage;
