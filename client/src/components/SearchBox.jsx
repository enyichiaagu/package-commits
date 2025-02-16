import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
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

  return (
    <div className='w-lg justify-center'>
      <div className='flex justify-center'>
        <SearchInput
          placeholder='Search npm package'
          variant={variant}
          {...getInputProps()}
        />
      </div>
      <ul {...getMenuProps()} className={`bg-list-bg max-h-60 overflow-y-auto`}>
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
