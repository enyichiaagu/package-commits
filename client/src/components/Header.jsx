import PropTypes from 'prop-types';
import Socials from './Socials';

function Header({ children }) {
  return (
    <header className='py-4 px-4 sm:py-4 lg:px-8 grid gap-y-2 grid-cols-[auto_auto] sm:grid-cols-[--spacing(26)_auto_auto]'>
      {children}
      <Socials className='only:col-span-full justify-self-end order-2 sm:order-3' />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Header;
