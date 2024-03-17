import React, { useState } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import {signOut,getAuth} from 'firebase/auth';
import { useDispatch,useSelector } from 'react-redux';
import { clearUser, selectLoading, selectUser,setLoading } from '../../store';
import logo from '../../assets/logotb.png';
function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const isloggedin=useSelector(selectUser);
  const auth = getAuth();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error('Error logging out:', error.message);
    }finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <>
      <nav className="sticky top-0 backdrop-blur-xl bg-black bg-opacity-75 z-20 w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2  top-0 w-full">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* Include your logo or text here */}
            <span className="self-center text-5xl rounded-3xl sm:rounded-xl py-1 p-2 font-semibold whitespace-nowrap dark:text-white flex items-center">
                <span className='font-bold text-blue-200'>C</span>
                <span className='text-4xl' style={{background: 'linear-gradient(to right, #f32170, #ff6b08,#cf23cf, #eedd44)',
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text'}}>ompeto</span>
                {/* <img className='h-8 sm:h-16' src={logo} alt="" /> */}
          </span>

          </NavLink>
          <button
            className="transition-all focus:outline-none md:hidden"
            onClick={toggleNav}
          >
            <svg
              className={`h-6 w-6 text-gray-500 ${isNavOpen?"absolute top-10 z-50 right-10":""}`}
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
            className={`md:static md:w-auto md:opacity-1 md:text-white backdrop-blur-xl md:h-auto md:rounded-none ${
              isNavOpen ? ' z-1 absolute -top-0 flex h-[100vh] w-full' : ' h-0 w-0   opacity-1'
            }  absolute top-16 left-0  md:flex overflow-hidden items-center justify-center transition-all duration-300 ease-in-out bg-black  backdrop-blur-lg`}
            id="navbar-default"
          >
            <ul className="">
              <li>
                <NavLink
                  to="/competitions"
                  className={`navelem `}
                  onClick={toggleNav}
                >
                  Competitions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={` navelem`}
                  onClick={toggleNav}
                >
                  Dashboard
                </NavLink>
              </li>
          
            </ul>
          </div>
              <div   onClick={()=>{handleLogout();toggleNav()}}
              className={` flex authbtn cursor-pointer ${isloggedin?"flex":'hidden'}`}>
            
            
       <span class="material-symbols-outlined">
logout
</span>
              </div>
              <div className={`flex ${!isloggedin?"flex":'hidden'}`} >
              <NavLink
                  to="/login"

                  className={`authbtn`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
  
                  className={` authbtn `}
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