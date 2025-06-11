import { NavLink } from 'react-router';

export type TabTypes = 'daily' | 'monthly';

interface ControlProps {
  option: TabTypes;
  currentTab: TabTypes;
}

function ControlBtn({ option, currentTab }: ControlProps) {
  return (
    <NavLink
      className={`px-3 sm:px-6 py-0.5 ${
        option === currentTab && 'bg-black text-white shadow-md'
      }`}
      to={`?tab=${option}`}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </NavLink>
  );
}

export default ControlBtn;
