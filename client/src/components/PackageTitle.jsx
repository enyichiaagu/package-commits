import { FaGithubAlt } from 'react-icons/fa6';
import { TbBrandNpm } from 'react-icons/tb';
import { SlGlobe } from 'react-icons/sl';

function PackageTitle() {
  return (
    <>
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
    </>
  );
}

export default PackageTitle;
