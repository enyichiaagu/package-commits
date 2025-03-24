import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';

const inputStyles = {
  front: 'sm:text-xl py-2 px-6',
  normal: '',
};

const containerStyles = {
  front: 'bg-white border border-custom-grey',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, pkg, otherProps: { value, ...restProps } },
  ref
) {
  let isFrontVariant = variant === 'front';
  let trimmedValue = value.trim();
  const [displayValue, setDisplayValue] = useState(pkg || '');

  if (value && displayValue !== value) setDisplayValue(value);

  return (
    <div className={`flex justify-center ${containerStyles[variant]}`}>
      <input
        className={`placeholder:text-black w-full block outline-0 ${inputStyles[variant]}`}
        placeholder={placeholder}
        type='text'
        ref={ref}
        autoCapitalize='none'
        autoCorrect='off'
        value={displayValue}
        onInput={(event) => setDisplayValue(event.currentTarget.value)}
        {...restProps}
      />
      {isFrontVariant && (
        <Link
          to={trimmedValue && `/package/${trimmedValue}`}
          className='inline-flex items-center pr-4'
        >
          <BiSearchAlt className='text-2xl sm:text-4xl' />
        </Link>
      )}
    </div>
  );
});

SearchInput.propTypes = {
  variant: PropTypes.oneOf(Object.keys(inputStyles)),
  placeholder: PropTypes.string,
  pkg: PropTypes.string,
  otherProps: PropTypes.object,
};

export default SearchInput;
