import { forwardRef } from 'react';

export interface ListedItem {
  package: {
    name: string;
    description: string;
  };
  highlight: boolean;
}

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  item: ListedItem;
  highlighted: boolean;
}

const SearchListItem = forwardRef(function SearchListItem(
  { item, highlighted, ...otherProps }: ListItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  return (
    <li
      ref={ref}
      className={`${
        highlighted ? 'bg-green-highlight' : ''
      } pl-10 pr-2 py-1 border-b-1 border-custom-grey cursor-pointer`}
      {...otherProps}
    >
      {item.highlight ? (
        <span
          className='block'
          dangerouslySetInnerHTML={{ __html: item.highlight }}
        ></span>
      ) : (
        <span className='block'>{item.package.name}</span>
      )}
      <span className='block text-xs truncate'>{item.package.description}</span>
    </li>
  );
});

export default SearchListItem;
