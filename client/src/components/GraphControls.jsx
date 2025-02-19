import PropTypes from 'prop-types';
import { useSelect } from 'downshift';
import { AiFillCaretDown } from 'react-icons/ai';
import ControlBtn from './ControlBtn';

const timeFrames = ['Current', '2025', '2024'];

function GraphControls({ tabType }) {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
  } = useSelect({
    items: timeFrames,
  });

  return (
    <div className='my-8 flex'>
      <ControlBtn option='daily' currentTab={tabType} />
      <ControlBtn option='monthly' currentTab={tabType} />

      <div className='ml-auto'>
        <div
          {...getToggleButtonProps()}
          className='flex items-center gap-2 pl-6 pr-4 py-0.5 border cursor-pointer'
        >
          <span>{selectedItem || timeFrames[0]}</span>
          <AiFillCaretDown className='text-xl' />
        </div>
        <ul
          {...getMenuProps()}
          className='absolute z-10 shadow-md bg-list-bg w-33'
        >
          {isOpen &&
            timeFrames.map((value, index) => (
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
};

export default GraphControls;
