import React from 'react';
import { NavLink } from 'react-router-dom'; // Импортируем NavLink вместо Link

const Menu = () => {
  const baseClasses = "px-4 py-2 rounded-3xl ";
  const activeClasses = "bg-brown text-white ";
  const inactiveClasses = "bg-gray text-brown hover:bg-brown hover:text-white";

  return (
    <div className="flex text-brown h-16 items-center">
      <div className="flex-1 flex justify-start pl-4 space-x-6">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? baseClasses + activeClasses : baseClasses + inactiveClasses
          }
        >
          Офисы
        </NavLink>

        <NavLink
          to={"/devices"}
          className={({ isActive }) =>
            isActive ? baseClasses + activeClasses : baseClasses + inactiveClasses
          }
        >
          Устройства
        </NavLink>

        <NavLink
          to={"/journal"}
          className={({ isActive }) =>
            isActive ? baseClasses + activeClasses : baseClasses + inactiveClasses
          }
        >
          Журнал
        </NavLink>
      </div>

      <div className="flex-none pr-4">
        <span className="text-lg font-light">Smart Office</span>
      </div>
    </div>
  );
};

export default Menu;