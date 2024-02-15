import React from 'react';
import giticon from '../../assets/icons/github.png';
import gicon from '../../assets/icons/google.png';
import ficon from '../../assets/icons/facebook.png';
import { auth } from '../../firebaseconfig/firebaseconfig';
import {GoogleAuthProvider} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store';
export default function CollegeRegistrationForm() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const gauth=new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, gauth);
      dispatch(setUser(result.user));
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmit = (data) => {
    // Handle form submission logic
    console.log(data);
  };

  return (
    <>
     <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full  xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcom Back!
            </h2>
            <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
          </div>
          <div className="flex flex-row justify-evenly items-center space-x-3">
            <img className=" w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300" src={gicon}/>
          <img className="w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300" src={giticon}/>
           <img src={ficon} className="w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300"/>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-200"></span>
            <span className="text-gray-300 font-normal">or continue with</span>
            <span className="h-px w-16 bg-gray-200"></span>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true"/>
            <div className="relative">
              <div className="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
              <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" type="" placeholder="mail@gmail.com" value="mail@gmail.com"/>
            </div>
            <div className="mt-8 content-center">
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="Enter your password" value="*****|"/>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-indigo-400 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Sign in
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Don't have an account?</span>
              <a href="#" className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign
                up</a>
            </p>
          
        {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}