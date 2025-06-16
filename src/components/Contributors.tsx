import type { PackageData } from 'src/hooks/usePackage';
import useCommits, { type Period } from '../hooks/useCommits';

const positions = [
  'bg-purple-400 z-1',
  'bg-purple-800 z-2',
  'bg-blue-400 z-3',
  'bg-red-800 z-4',
  'bg-orange-400 z-5',
].toReversed();

interface ContributorsProps {
  pkgData?: PackageData;
  period: Period;
}

function Contributors({ pkgData, period }: ContributorsProps) {
  const { contributors } = useCommits(pkgData, period);
  let numOfCbs = contributors.length;
  let pfArrayLength = numOfCbs < 5 ? numOfCbs : 5;

  return (
    <div className='flex sm:gap-2 gap-1 items-center'>
      <div className='flex'>
        {Array.from(
          {
            length: pfArrayLength,
          },
          (_, index) => {
            return (
              <span
                key={index}
                title={`${contributors[index].login}${
                  index === 0 ? ' (top)' : ''
                }`}
                className={`h-5 ${index === pfArrayLength - 1 ? 'w-5' : 'w-3'}`}
              >
                <span
                  className={`inline-block w-5 h-5 relative rounded-full bg-contain ${positions[index]}`}
                  style={{
                    backgroundImage: `url(${contributors[index]?.avatar_url})`,
                  }}
                ></span>
              </span>
            );
          }
        )}
      </div>
      <span>{`${numOfCbs} contributor${numOfCbs === 1 ? '' : 's'}`}</span>
    </div>
  );
}

export default Contributors;
