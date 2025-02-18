import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const variants = {
  front: 'text-xl py-2 px-6',
  normal: '',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, ...otherProps },
  ref
) {
  return (
    <input
      className={`placeholder:text-black w-full block outline-0 ${variants[variant]}`}
      placeholder={placeholder}
      type='text'
      ref={ref}
      {...otherProps}
    />
  );
});

SearchInput.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  placeholder: PropTypes.string,
  otherProps: PropTypes.object,
};

export default SearchInput;
