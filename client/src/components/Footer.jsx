import PropTypes from 'prop-types';

function Footer() {
  return (
    <div className='text-center py-4'>{`Made with <3 and JavaScript`}</div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
