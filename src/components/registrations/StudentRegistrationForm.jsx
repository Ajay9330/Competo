import React, { useEffect, useState } from 'react';
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { addDoc,collection,} from 'firebase/firestore';
import {ref,uploadBytes,getDownloadURL,} from 'firebase/storage';
import { app, firestore, storage,auth } from '../../firebaseconfig/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setUser,selectUser } from '../../store';
import{GoogleAuthProvider,GithubAuthProvider,signInWithPopup} from 'firebase/auth';
import giticon from '../../assets/icons/github.png';
import gicon from '../../assets/icons/google.png';
import ficon from '../../assets/icons/facebook.png';
import { setLoading } from '../../store';



export default function StudentRegistrationForm() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [error, setError] = useState(null);
  const gauth=new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, gauth);
      dispatch(setUser(result.user));
    } catch (error) {
      setError(error.message);
   
    }finally{
      dispatch(setLoading(false))
    }
  };
  useEffect(() => {
    if (user) {
      // history('/dashboard');
    }
  }, [user, history]);
  const [formData, setFormData] = useState({
    usertype: 'student',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(e.target.src);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleImageUpload = async () => {
    if (formData.image) {
      const storageRef = ref(storage, `profileImages/${formData.email}`);
      await uploadBytes(storageRef, formData.image, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const imageURL = await handleImageUpload();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: imageURL,
        usertype:formData.usertype,
      });


      const userRef = collection(firestore, 'users');
      const docData = {
        uid: userCredential.user.uid,
        ...formData,
        image: imageURL, // Store the download URL instead of the File object
        // other: { ...userCredential },
      };
      await addDoc(userRef, docData);
      dispatch(setUser(docData));
      // history('/student/dashboard');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
  

    <div className="">
      
        <div className=" md:flex flex-wrap items-center justify-evenly gap-x-11">
        <div className=' min-w-[90vw]'>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcom Back!
            </h2>
            <p className="mt-2 text-sm text-gray-500"> Let's start with Competo</p>
          </div>
          <div className="flex flex-row justify-evenly items-center space-x-3">
            <img onClick={loginWithGoogle} className=" w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300" src={gicon}/>
          <img className="w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300" src={giticon}/>
           <img src={ficon} className="w-9 h-9  rounded-2xl  hover:shadow-3xl block cursor-pointer transition ease-in duration-300"/>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-200"></span>
            <span className="text-gray-300 font-normal">or continue with</span>
            <span className="h-px w-16 bg-gray-200"></span>
          </div>
         
        </div>

        <div className='md:w-96 p-5 md:border-2 md:border-blue-300 hover:border-blue-700 md:grid grid-cols-1 justify-items-center md:h-96 rounded-3xl hover:shadow-xl'>
            <img className=' h-40 mx-auto md:m-0 rounded-full w-40 border-2 border-gray-300 transition-all cursor-pointer hover:shadow-black hover:shadow-lg  block col-span-1' src={formData.image?URL.createObjectURL(formData.image):""} alt="" />
          
            <span className='top-0 hidden md:block'>{formData.email}</span>
            <div className='hidden md:block h-1 w-full bg-gray-300'></div>
            <p className='w-full text-wrap break-words overflow-auto text-center text-4xl font-medium hidden md:block '>{formData.firstName+formData.lastName}</p>
        </div>
           <form className="mt-8 p-6 space-y-6 grow-0.3" onSubmit={handleSubmit}>
          <div className="mt-8 content-center">
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                FirstName
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-b  border-gray-300 focus:outline-none focus:border-indigo-500"      type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}/>
            </div>

            <div className="mt-8 content-center">
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                LastName
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-b  border-gray-300 focus:outline-none focus:border-indigo-500" type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}/>
            </div>
            <div className="relative">
            
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
              <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none  focus:border-indigo-500" 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  />
            </div>

       
            <div className="mt-8 content-center">
              <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input className="w-full content-center text-base px-4 py-2 border-b  border-gray-300 focus:outline-none focus:border-indigo-500"  type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}/>
            </div>

       

            <div className='mt-8 content-center'>
                 <label className='ml-3 text-sm font-bold text-gray-700 tracking-wide'>
                  Profile Image:     </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
           
              </div>

            <div>
              <button type="submit" className="w-full flex justify-center bg-gradient-to-r from-green-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                SIGN UP
              </button>
            </div>
        
          
        {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
   
  );
}