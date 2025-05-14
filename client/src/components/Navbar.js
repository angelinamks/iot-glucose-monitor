import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? 'bg-[#7c2d2d] text-white'
        : 'text-[#5E2B2B] hover:bg-[#f3e2dd]'
    }`;

  return (
    <nav className="bg-[#fff9f7] shadow-md mb-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-4 justify-center flex-wrap items-center">
        <Link to="/journal" className={linkClass('/journal')}>
          Журнал
        </Link>
        <Link to="/add" className={linkClass('/add')}>
          Додати показник
        </Link>
        <Link to="/info" className={linkClass('/info')}>
          Корисна інформація
        </Link>
        <Link to="/analytics" className={linkClass('/analytics')}>
          Графіки та аналітика
        </Link>

        <div className="ml-auto flex gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md font-medium text-white bg-[#7c2d2d] hover:bg-[#5e2b2b] transition"
            >
              Вийти
            </button>
          ) : (
            <>
              <Link to="/login" className={linkClass('/login')}>
                Вхід
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
