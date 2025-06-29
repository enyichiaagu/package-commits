import { FaGithubAlt } from 'react-icons/fa6';
import { TbBrandNpm } from 'react-icons/tb';
import { SlGlobe } from 'react-icons/sl';
import type { PackageData } from '../hooks/usePackage';

const NPM_PACKAGE = 'https://npmjs.org/package';
const GITHUB_REPO = 'https://github.com';

function PackageTitle({ pkgData }: { pkgData?: PackageData }) {
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-lg/tight sm:text-3xl'>
          <span className='font-bold'>{pkgData?.name}</span>
          <span>{pkgData && `(${pkgData.version})`}</span>
        </div>
        <div className='flex text-2xl gap-3 items-start sm:items-end'>
          {pkgData?.owner && (
            <a
              target='_blank'
              href={`${GITHUB_REPO}/${pkgData.owner}/${pkgData.repo}`}
              className='hover:text-gray-500'
            >
              <FaGithubAlt />
            </a>
          )}
          {pkgData?.name && (
            <a
              target='_blank'
              href={`${NPM_PACKAGE}/${pkgData.name}`}
              className='hover:text-red-600'
            >
              <TbBrandNpm />
            </a>
          )}
          {pkgData?.homepage && (
            <a
              target='_blank'
              href={pkgData.homepage}
              className='hover:text-blue-400'
            >
              <SlGlobe />
            </a>
          )}
        </div>
      </div>

      <p className='mt-3 mb-5 sm:my-0'>{pkgData?.description}</p>
    </>
  );
}

export default PackageTitle;
