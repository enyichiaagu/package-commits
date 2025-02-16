import PropTypes from 'prop-types';

function Footer() {
  return (
    <div className='text-center text-sm py-4 bg-body-gradient-b'>{`Made with <3 and JavaScript`}</div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
