import PropTypes from 'prop-types';
import Socials from './Socials';

function Header({ children }) {
  return (
    <header className='py-4 px-4 sm:py-4 sm:px-8 grid gap-y-2 grid-cols-[auto_auto] sm:gap-20'>
      {children}
      <Socials className='only:col-span-full justify-self-end order-2' />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Header;
