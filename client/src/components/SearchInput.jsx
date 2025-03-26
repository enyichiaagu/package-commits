import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';

const inputStyles = {
  // front: 'sm:text-xl py-2 px-6',
  front: '',
  normal: '',
};

const containerStyles = {
  // front: 'bg-white border border-custom-grey',
  front: '',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, pkg, otherProps: { value, ...restProps } },
  ref
) {
  // let isFrontVariant = variant === 'front';
  let trimmedValue = value.trim();
  const [displayValue, setDisplayValue] = useState(pkg || '');

  if (value && displayValue !== value) setDisplayValue(value);

  return (
    <div
      className={`flex bg-white border border-custom-grey rounded-lg py-1 px-4 gap-x-2 ${containerStyles[variant]}`}
    >
      <Link
        to={trimmedValue && `/package/${trimmedValue}`}
        className='block w-8'
      >
        <BiSearchAlt className='text-3xl sm:text-4xl text-darker-grey' />
      </Link>

      <input
        className={`w-full placeholder:text-black outline-0 ${inputStyles[variant]}`}
        placeholder={placeholder}
        type='text'
        ref={ref}
        autoCapitalize='none'
        autoCorrect='off'
        value={displayValue}
        onInput={(event) => setDisplayValue(event.currentTarget.value)}
        {...restProps}
      />
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
