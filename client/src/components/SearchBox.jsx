import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCombobox } from 'downshift';
import SearchInput from './SearchInput';
import SearchListItem from './SearchListItem';

// const mockList = [
//   { id: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird' },
//   { id: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace' },
//   { id: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
//   { id: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
//   { id: 'book-5', author: 'George Orwell', title: '1984' },
//   { id: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice' },
//   { id: 'book-7', author: 'Marcus Aurelius', title: 'Meditations' },
//   {
//     id: 'book-8',
//     author: 'Fyodor Dostoevsky',
//     title: 'The Brothers Karamazov',
//   },
//   { id: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina' },
//   { id: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' },
// ];

const NPM_SEARCH = 'https://api.npms.io/v2/search';

async function getFilteredList(query) {
  // const lowerCaseQuery = query.toLowerCase();

  // return function itemsFilter(item) {
  //   return (
  //     !query ||
  //     item.author.toLowerCase().includes(lowerCaseQuery) ||
  //     item.title.toLowerCase().includes(lowerCaseQuery)
  //   );
  // };
  let response = await fetch(`${NPM_SEARCH}?q=${encodeURIComponent(query)}`);
  let data = await response.json();
  return data.results;
}

function SearchBox({ variant }) {
  const [items, setItems] = useState([]);

  const { getInputProps, getMenuProps, getItemProps } = useCombobox({
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
      <ul {...getMenuProps()} className='bg-list-bg max-h-60 overflow-y-auto'>
        {items.map((item, index) => (
          <SearchListItem
            key={index}
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
