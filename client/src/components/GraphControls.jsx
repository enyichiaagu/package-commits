import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import { AiFillCaretDown } from 'react-icons/ai';
import ControlBtn from './ControlBtn';
import usePkgYears from '../hooks/usePkgYears';
import { generateYrsArr } from '../hooks/utils';

const currentYear = new Date().getFullYear();

function GraphControls({ tabType, pkgData }) {
  let [timeFrame, setTimeFrame] = useState(['Current']);

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
  } = useSelect({
    items: timeFrame,
  });

  const { year, isLoading, isError } = usePkgYears(pkgData);

  useEffect(() => {
    year &&
      setTimeFrame((prev) => [...prev, ...generateYrsArr(year, currentYear)]);
  }, [year]);

  return (
    <div className='my-8 flex'>
      <ControlBtn option='daily' currentTab={tabType} />
      <ControlBtn option='monthly' currentTab={tabType} />

      <div className='ml-auto'>
        <div
          {...getToggleButtonProps()}
          className='flex items-center gap-2 pl-6 pr-4 py-0.5 border cursor-pointer'
        >
          <span>{selectedItem || 'Current'}</span>
          <AiFillCaretDown className='text-xl' />
        </div>
        <ul
          {...getMenuProps()}
          className={`absolute z-10 shadow-md bg-list-bg w-33 max-h-60 overflow-y-auto ${
            !isOpen && 'hidden'
          }`}
        >
          {isOpen &&
            timeFrame.map((value, index) => (
              <li
                className='pl-6 text-sm px-3 py-1 border-b-1 border-custom-grey'
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
}

GraphControls.propTypes = {
  tabType: PropTypes.oneOf(['daily', 'monthly']).isRequired,
  pkgData: PropTypes.object,
};

export default GraphControls;
