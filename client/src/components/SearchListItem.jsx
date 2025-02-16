import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SearchListItem = forwardRef(function SearchListItem(
  { item, highlighted },
  ref
) {
  return (
    <li
      ref={ref}
      className={`${
        highlighted ? 'bg-green-highlight' : ''
      } px-3 py-1 border-b-1 border-custom-grey`}
    >
      <span className='block text-sm'>{item.package.name}</span>
      <span className='block text-xs truncate'>{item.package.description}</span>
    </li>
  );
});

SearchListItem.propTypes = {
  item: PropTypes.object.isRequired,
  highlighted: PropTypes.bool.isRequired,
};

export default SearchListItem;
