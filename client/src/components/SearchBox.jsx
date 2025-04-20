import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import SearchInput from './SearchInput';
import SearchListItem from './SearchListItem';

const NPM_SEARCH = 'https://api.npms.io/v2/search/suggestions';

async function getFilteredList(query) {
  let trimmed = query.trim();
  // Maximum characters for an NPM Package is 214
  if (!trimmed || trimmed.length > 214) return [];

  try {
    let response = await fetch(`${NPM_SEARCH}?q=${trimmed}`);
    if (!response.ok) throw new Error();
    let data = await response.json();
    return data;
  } catch {
    return [];
  }
}

function SearchBox({ variant, pkg }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    initialInputValue: pkg || '',
    async onInputValueChange({ inputValue }) {
      setItems(await getFilteredList(inputValue));
    },
    onSelectedItemChange({ inputValue }) {
      navigate(`/package/${inputValue}`);
    },
    async onIsOpenChange({ inputValue, isOpen }) {
      if (isOpen && !items.length && inputValue === pkg) {
        setItems(await getFilteredList(inputValue));
      }
    },
    itemToString(item) {
      return item?.package.name || '';
    },
  });

  return (
    <div className='w-full relative'>
      <SearchInput
        placeholder='Search npm package'
        variant={variant}
        highlightedIndex={highlightedIndex}
        otherProps={getInputProps()}
      />
      <ul
        {...getMenuProps()}
        className={`bg-list-bg max-h-60 overflow-y-auto shadow-md z-10 absolute w-[calc(100%-(--spacing(4)))] sm:w-[calc(100%-(--spacing(6)))] right-0`}
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
