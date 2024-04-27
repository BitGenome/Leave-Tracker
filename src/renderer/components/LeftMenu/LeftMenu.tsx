import { NavLink } from 'react-router-dom';
import { LeftMenuIcons } from './LeftMenuIcons';

export default function LeftMenu() {
  return (
    <div className="bg-white w-14 h-screen py-5">
      <div className=" h-full flex flex-col items-center gap-4">
        {LeftMenuIcons.map((menu, _index) => {
          return (
            <NavLink to={menu.link}>
              {({ isActive }) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={`${_index}-${menu.name}`}>
                  {menu.icon(isActive)}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
