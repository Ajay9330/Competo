import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { app,auth } from '../firebaseconfig/firebaseconfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoading, setUserData, setUserLoginData } from '../store'; 
import {useNavigate,Link} from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseconfig/firebaseconfig'; // Import the firestore instance



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate=useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserLoginData(result.user));
  
      // Fetch additional user data from Firestore based on user type
      const userDocRef = doc(firestore, 'users', result.user.email);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // Set user data in the Redux store
        dispatch(setUserData(userData));
      } else {
        console.error('User document not found');
      }
  
      // navigate('./dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className='w-screen my-24 sm:my-28 flex items-center justify-center'>

<div className="mx-auto  w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleLogin}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center w-full">Sign in to Competo</h5>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder=""
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="flex items-start">
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <Link to='/signup' 
           className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>

    </div>
    
  );
};

export default Login;
