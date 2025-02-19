import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

const tabTypes = ['daily', 'monthly'];

function ControlBtn({ option, currentTab }) {
  return (
    <NavLink
      className={`px-6 py-0.5 ${
        option === currentTab && 'bg-black text-white shadow-md'
      }`}
      to={`?tab=${option}`}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </NavLink>
  );
}

ControlBtn.propTypes = {
  option: PropTypes.oneOf(tabTypes).isRequired,
  currentTab: PropTypes.oneOf(tabTypes).isRequired,
};

export default ControlBtn;
