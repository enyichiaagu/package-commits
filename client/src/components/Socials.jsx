import { ImGithub } from 'react-icons/im';
import { BsTwitterX } from 'react-icons/bs';
import PropTypes from 'prop-types';

function Socials({ className = '' }) {
  return (
    <div className={`flex gap-5 ${className}`}>
      <ImGithub className='text-2xl' />
      <BsTwitterX className='text-2xl' />
    </div>
  );
}

Socials.propTypes = {
  className: PropTypes.string,
};

export default Socials;
