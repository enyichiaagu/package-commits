import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SearchListItem = forwardRef(function SearchListItem(
  { item, highlighted, ...otherProps },
  ref
) {
  return (
    <li
      ref={ref}
      className={`${
        highlighted ? 'bg-green-highlight' : ''
      } px-3 py-1 border-b-1 border-custom-grey cursor-pointer`}
      {...otherProps}
    >
      <span className='block text-sm'>{item.package.name}</span>
      <span className='block text-xs truncate'>{item.package.description}</span>
    </li>
  );
});

SearchListItem.propTypes = {
  item: PropTypes.object.isRequired,
  highlighted: PropTypes.bool.isRequired,
  otherProps: PropTypes.object,
};

export default SearchListItem;
