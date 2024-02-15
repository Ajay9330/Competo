import React, { useState } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import {signOut,getAuth} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store';
function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const auth = getAuth();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Dispatch the clearUser action to update the user state in the store
      dispatch(clearUser());
      // Redirect to the login page after logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <>
      <nav className="bg-black bg-opacity-75 sticky top-0 z-20
       w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4  top-0 w-full">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* Include your logo or text here */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Competo
            </span>
          </NavLink>
          <button
            className="transition-all focus:outline-none md:hidden"
            onClick={toggleNav}
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isNavOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
          <div
            className={`md:static md:w-auto md:opacity-1 md:text-white md:h-auto md:rounded-none md:bg-transparent ${
              isNavOpen ? ' z-1 absolute flex h-[100vh] w-full' : ' h-0 w-0  rounded-br-full opacity-1'
            }  absolute top-16 left-0  md:flex overflow-hidden items-center justify-center transition-all duration-300 ease-in-out bg-black bg-opacity-75`}
            id="navbar-default"
          >
            <ul className="">
              <li>
                <NavLink
                  to="/competitions"
                  onClick={toggleNav}
                  className={`navelem `}
                >
                  Competitions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={toggleNav}
                  className={` navelem`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
            <button
              onClick={handleLogout}
              className={`navelem cursor-pointer`}
            >
              Logout
            </button>
          </li>
            </ul>
          </div>
              <div className='flex'>
              <NavLink
                  to="/login"
                  onClick={toggleNav}
                  className={`navelem`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={toggleNav}
                  className={` hover: navelem `}
                >
              <span class="material-symbols-outlined">
person_add
</span>
                </NavLink>   
              </div>
                          
        </div>
      </nav>
      {/* <div className=' mb-96 block'/> */}
    </>
  );
}

export default Header;