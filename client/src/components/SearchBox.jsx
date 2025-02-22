import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import SearchInput from './SearchInput';
import SearchListItem from './SearchListItem';

const NPM_SEARCH = 'https://api.npms.io/v2/search/suggestions';

async function getFilteredList(query) {
  if (!query.trim()) return [];
  let response = await fetch(`${NPM_SEARCH}?q=${query.trim()}`);
  let data = await response.json();
  return data;
}

function SearchBox({ variant, pkg }) {
  const [items, setItems] = useState([]);
  const [displayValue, setDisplayValue] = useState(pkg || '');
  const navigate = useNavigate();

  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    async onInputValueChange({ inputValue }) {
      setDisplayValue(inputValue);
      setItems(await getFilteredList(inputValue));
    },
    items,
    itemToString(item) {
      return item?.package.name || '';
    },
  });

  useEffect(() => {
    selectedItem && navigate(`/package/${selectedItem.package.name}`);
  }, [selectedItem]);

  // Make sure it fetches updates on a fresh display packages page
  useEffect(() => {
    const loadItems = async () => {
      if (isOpen && pkg && !items.length) {
        setItems(await getFilteredList(pkg));
      }
    };
    loadItems();
  }, [isOpen, pkg, items]);

  return (
    <div className='w-lg justify-center'>
      <SearchInput
        placeholder='Search npm package'
        variant={variant}
        displayValue={displayValue}
        {...getInputProps()}
      />
      <ul
        {...getMenuProps()}
        className={`bg-list-bg max-h-60 overflow-y-auto shadow-md z-10 absolute w-lg ${
          !displayValue && 'hidden'
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
  pkg: PropTypes.string,
};

export default SearchBox;
