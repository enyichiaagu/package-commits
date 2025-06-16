import Header from '../components/Header';
import SearchBox from '../components/SearchBox';

let description = 'View the heatmap of commits made to any npm package';

export function meta() {
  return [
    { title: 'Package Commits' },
    {
      name: 'description',
      description,
    },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <main className='flex-1 mx-4'>
        <div className='flex flex-col items-center mt-10 sm:mt-20'>
          <h1 className='font-bold italic text-3xl sm:text-5xl tracking-tight [word-spacing:-0.5rem]'>
            package commits
          </h1>
          <span className='text-center w-60 sm:w-full'>{description}</span>
        </div>
        <div className='mt-10 max-w-lg mx-auto'>
          <SearchBox variant='front' />
        </div>
      </main>
    </>
  );
}
