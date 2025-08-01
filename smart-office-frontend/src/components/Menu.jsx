import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';


const Menu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const baseClasses = "px-4 py-2 rounded-3xl ";
  const activeClasses = "bg-brown text-white ";
  const inactiveClasses = "bg-gray text-brown hover:bg-brown hover:text-white";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Удаляем флаг авторизации
    localStorage.removeItem('userRole');   // Удаляем роль пользователя
    setIsDropdownOpen(false); // Закрываем выпадающее меню
    navigate("/login"); // Перенаправляем на страницу логина
  };


  const userName = localStorage.getItem('userName') || 'Гость';


  return (
    <>
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

        <div className="flex-none pr-4 inline-flex gap-8 relative">
          <span
            className="italic text-lg font-light cursor-pointer select-none"
            onClick={toggleDropdown}
          >
            {userName}
          </span>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to={"/login"}
                className="block px-4 py-2 text-sm text-brown hover:bg-gray-100"
                onClick={handleLogout}
              >
                Выход
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Menu;