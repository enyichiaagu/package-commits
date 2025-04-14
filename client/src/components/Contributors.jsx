import PropTypes from 'prop-types';
import useCommits from '../hooks/useCommits';

const positions = [
  'bg-blue-100 z-1 right-0',
  'bg-blue-200 z-2 sm:right-3 right-1',
  'bg-blue-300 z-3 sm:right-6 right-2',
  'bg-blue-400 z-4 sm:right-9 right-3',
  'bg-blue-500 z-5 sm:right-12 right-4',
].toReversed();

function Contributors({ pkgData, period }) {
  const { contributors } = useCommits(pkgData, period);
  let numOfContribs = contributors.length;

  return (
    <div className='mt-8 flex justify-end sm:gap-2 gap-1'>
      <div className='relative'>
        {Array.from(
          {
            length: numOfContribs < 5 ? numOfContribs : 5,
          },
          (_, index) => {
            return (
              <span
                key={index}
                title={contributors[index].login}
                className={`inline-block absolute w-5 h-5 rounded-full bg-contain ${positions[index]}`}
                style={{
                  backgroundImage: `url(${contributors[index]?.avatar_url})`,
                }}
              ></span>
            );
          }
        )}
      </div>
      <span>{`${numOfContribs} contributor${
        numOfContribs === 1 ? '' : 's'
      }`}</span>
    </div>
  );
}

Contributors.propTypes = {
  pkgData: PropTypes.object,
  period: PropTypes.oneOfType([PropTypes.oneOf(['Current']), PropTypes.number]),
};

export default Contributors;
