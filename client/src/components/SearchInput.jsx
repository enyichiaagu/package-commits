import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const variants = {
  front: 'bg-white border border-custom-grey text-xl py-2 px-6',
  normal: 'outline-0',
};

const SearchInput = forwardRef(function SearchInput(
  { variant, placeholder, ...otherProps },
  ref
) {
  return (
    <input
      className={`placeholder:text-black w-full block ${variants[variant]}`}
      placeholder={placeholder}
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
