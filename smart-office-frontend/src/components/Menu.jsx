import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Импортируем NavLink вместо Link

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

      <div className="flex-none pr-4 inline-flex gap-8">
        <span className="italic text-lg font-light">Оганесян Микаэл</span>
        <Link to={"/login"}><span className='underline text-lg cursor-pointer font-medium'>Выход</span></Link>
      </div>
    </div>
  );
};

export default Menu;