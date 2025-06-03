import { forwardRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import { AiFillCaretDown } from 'react-icons/ai';
import ControlBtn from './ControlBtn';
import useYears from '../hooks/useYears';

const GraphControls = forwardRef(function GraphControls(
  { tabType, pkgData, setPeriod, setDialogOpen },
  ref
) {
  // let [timeFrame, setTimeFrame] = useState(['Current']);
  const { years, error, mutate } = useYears(pkgData);
  let timeFrame = ['Current', ...years];

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
    highlightedIndex,
  } = useSelect({
    items: timeFrame,
  });

  useImperativeHandle(ref, () => ({ mutate }), [mutate]);

  // TODO: Use URL to encode this
  useEffect(() => {
    setPeriod(selectedItem);
  }, [setPeriod, selectedItem]);

  useEffect(() => {
    if (error?.isTokenError) {
      setDialogOpen(true);
    }
  }, [error, setDialogOpen]);

  return (
    <div className='my-3 sm:my-8 flex items-center'>
      <ControlBtn option='daily' currentTab={tabType} />
      <ControlBtn option='monthly' currentTab={tabType} />

      <div className='ml-auto relative'>
        <div
          {...getToggleButtonProps()}
          className='flex items-center gap-2 pl-6 pr-4 py-0.5 border cursor-pointer'
        >
          <span>{selectedItem || 'Current'}</span>
          <AiFillCaretDown className='text-xl' />
        </div>
        <ul
          {...getMenuProps()}
          className={`absolute z-10 shadow-md bg-list-bg max-h-60 overflow-y-auto w-full ${
            !isOpen && 'hidden'
          }`}
        >
          {isOpen &&
            timeFrame.map((value, index) => (
              <li
                className={`pl-6 px-3 py-1 border-b-1 border-custom-grey cursor-pointer ${
                  highlightedIndex === index ? 'bg-green-highlight' : null
                }`}
                key={index}
                {...getItemProps({ value, index })}
              >
                {value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});

GraphControls.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
  setPeriod: PropTypes.func.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
};

export default GraphControls;
