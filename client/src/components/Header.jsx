import PropTypes from 'prop-types';
import Socials from './Socials';

function Header({ children }) {
  return (
    <header className='py-2 px-4 sm:py-4 sm:px-8 flex justify-between'>
      {children}
      <Socials className='ml-auto' />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
