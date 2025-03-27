import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';

const containerStyles = {
  front: '',
  normal: 'sm:bg-inherit sm:border-0',
};

const iconStyles = {
  front: 'sm:text-4xl',
  normal: 'sm:text-3xl',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, pkg, otherProps: { value, ...restProps } },
  ref
) {
  let trimmedValue = value.trim();
  const [displayValue, setDisplayValue] = useState(pkg || '');
  const navigate = useNavigate();

  if (value && displayValue !== value) setDisplayValue(value);

  return (
    <div
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
        value={displayValue}
        onInput={(event) => setDisplayValue(event.currentTarget.value)}
        onKeyDownCapture={(event) =>
          event.key === 'Enter' && navigate(`/package/${trimmedValue}`)
        }
        {...restProps}
      />
    </div>
  );
});

SearchInput.propTypes = {
  variant: PropTypes.oneOf(Object.keys(containerStyles)),
  placeholder: PropTypes.string,
  pkg: PropTypes.string,
  otherProps: PropTypes.object,
};

export default SearchInput;
