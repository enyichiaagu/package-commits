import { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';
import type { UseComboboxGetInputPropsReturnValue } from 'downshift';

export type InputVariants = 'front' | 'normal';

interface SearchInputProps {
  variant: InputVariants;
  placeholder: string;
  highlightedIndex: number;
  otherProps: UseComboboxGetInputPropsReturnValue;
}

const containerStyles: Record<InputVariants, string> = {
  front: '',
  normal: 'sm:bg-inherit sm:border-0',
};

const iconStyles: Record<InputVariants, string> = {
  front: 'sm:text-4xl',
  normal: 'sm:text-3xl',
};

const SearchInput = forwardRef(function SearchInput(
  {
    variant,
    placeholder,
    highlightedIndex,
    otherProps: { value, ...restProps },
  }: SearchInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  let navigate = useNavigate();
  let trimmedValue = value.trim();

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={`flex rounded-lg py-1 px-4 gap-x-2 bg-white border border-custom-grey ${containerStyles[variant]}`}
    >
      <Link
        to={trimmedValue && `/package/${trimmedValue}`}
        className='flex w-8 sm:w-10 justify-end'
      >
        <BiSearchAlt
          className={`text-3xl text-darker-grey ${iconStyles[variant]}`}
        />
      </Link>

      <input
        className={`w-full placeholder:text-black [&::-webkit-search-cancel-button]:hidden outline-0`}
        placeholder={placeholder}
        required
        type='search'
        ref={ref}
        autoCapitalize='none'
        autoCorrect='off'
        autoFocus={variant === 'front'}
        value={value}
        onKeyDownCapture={(event) => {
          if (event.key === 'Enter' && highlightedIndex < 0 && trimmedValue) {
            event.currentTarget.blur();
            navigate(`/package/${trimmedValue}`);
          }
        }}
        {...restProps}
      />
    </form>
  );
});

export default SearchInput;
