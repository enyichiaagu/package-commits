import { FaGithubAlt } from 'react-icons/fa6';
import { TbBrandNpm } from 'react-icons/tb';
import { SlGlobe } from 'react-icons/sl';
import PropTypes from 'prop-types';

function PackageTitle({ pkgData }) {
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-lg/tight sm:text-3xl'>
          <span className='font-bold'>{pkgData?.name}</span>
          <span>{pkgData && `(${pkgData.version})`}</span>
        </div>
        <div className='flex text-2xl gap-3 items-start sm:items-end'>
          <FaGithubAlt />
          <TbBrandNpm />
          <SlGlobe />
        </div>
      </div>

      <p>{pkgData?.description}</p>
    </>
  );
}

PackageTitle.propTypes = {
  pkgData: PropTypes.object,
};

export default PackageTitle;
