import Socials from './Socials';

function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className='py-4 px-4 sm:py-4 lg:px-8 grid gap-y-2 grid-cols-[auto_auto] sm:grid-cols-[--spacing(26)_auto_auto]'>
      {children}
      <Socials className='only:col-span-full justify-self-end order-2 sm:order-3' />
    </header>
  );
}

export default Header;
