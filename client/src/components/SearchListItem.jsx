import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const SearchListItem = forwardRef(function SearchListItem({ item }, ref) {
  return (
    <li ref={ref} className='px-3 py-1 border-b-1 border-custom-grey'>
      <span className='block text-sm'>{item.package.name}</span>
      <span className='block text-xs'>{item.package.description}</span>
    </li>
  );
});

SearchListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SearchListItem;
