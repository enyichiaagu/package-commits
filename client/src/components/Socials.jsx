import { ImGithub } from 'react-icons/im';
import { BsTwitterX } from 'react-icons/bs';
import PropTypes from 'prop-types';

function Socials({ className = '' }) {
  return (
    <div className={`flex gap-5 text-2xl sm:text-2.5 ${className}`}>
      <a href='https://github.com/enyichiaagu/package-commits' target='_blank'>
        <ImGithub />
      </a>
      <a href='https://x.com/EnyichiA' target='_blank'>
        <BsTwitterX />
      </a>
    </div>
  );
}

Socials.propTypes = {
  className: PropTypes.string,
};

export default Socials;
