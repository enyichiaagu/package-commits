import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { BiSearchAlt } from 'react-icons/bi';

const inputStyles = {
  front: 'text-xl py-2 px-6',
  normal: '',
};

const containerStyles = {
  front: 'bg-white border border-custom-grey',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, displayValue, ...otherProps },
  ref
) {
  let isFrontVariant = variant === 'front';

  return (
    <div className={`flex justify-center ${containerStyles[variant]}`}>
      <input
        className={`placeholder:text-black w-full block outline-0 ${inputStyles[variant]}`}
        placeholder={placeholder}
        type='text'
        ref={ref}
        {...otherProps}
        value={displayValue}
      />
      {isFrontVariant && (
        <Link
          to={`/package/${displayValue}`}
          className='inline-flex items-center pr-4'
        >
          <BiSearchAlt className='text-4xl' />
        </Link>
      )}
    </div>
  );
});

SearchInput.propTypes = {
  variant: PropTypes.oneOf(Object.keys(inputStyles)),
  placeholder: PropTypes.string,
  displayValue: PropTypes.string,
  otherProps: PropTypes.object,
};

export default SearchInput;
