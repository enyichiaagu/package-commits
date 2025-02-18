import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { useCombobox } from 'downshift';
import { BiSearchAlt } from 'react-icons/bi';
import SearchInput from './SearchInput';
import SearchListItem from './SearchListItem';
const NPM_SEARCH = 'https://api.npms.io/v2/search';

async function getFilteredList(query) {
  if (!query.trim()) return [];
  let response = await fetch(
    `${NPM_SEARCH}?q=${encodeURIComponent(query.trim())}`
  );
  let data = await response.json();
  return data.results;
}

function SearchBox({ variant }) {
  const [items, setItems] = useState([]);

  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    inputValue,
    // selectedItem,
  } = useCombobox({
    async onInputValueChange({ inputValue }) {
      setItems(await getFilteredList(inputValue));
    },
    items,
    itemToString(item) {
      return item?.package.name || '';
    },
  });

  let isFrontVariant = variant === 'front';

  return (
    <div className='w-lg justify-center'>
      <div
        className={`flex justify-center ${
          isFrontVariant && 'bg-white border border-custom-grey'
        }`}
      >
        <SearchInput
          placeholder='Search npm package'
          variant={variant}
          {...getInputProps()}
        />
        {isFrontVariant && (
          <Link to={`/package`} className='inline-flex items-center pr-4'>
            <BiSearchAlt className='text-4xl' />
          </Link>
        )}
      </div>
      <ul
        {...getMenuProps()}
        className={`bg-list-bg max-h-60 overflow-y-auto shadow-md z-10 absolute w-lg ${
          !inputValue && 'hidden'
        }`}
      >
        {isOpen &&
          items.map((item, index) => (
            <SearchListItem
              key={index}
              highlighted={index === highlightedIndex}
              {...getItemProps({ item, index })}
              item={item}
            />
          ))}
      </ul>
    </div>
  );
}

SearchBox.propTypes = {
  variant: PropTypes.oneOf(['front', 'normal']).isRequired,
};

export default SearchBox;
