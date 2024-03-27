import React, { useEffect } from 'react'
import { Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { selectUser } from './store'
import { firestore } from './firebaseconfig/firebaseconfig';
import Loader from './components/common/Loader';
import { selectLoading, setLoading, setUserLoginData, setUserData,selectUserdata } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'
import Home from './pages/Home';
import Search from './pages/Search';
import ViewComp from './pages/ViewComp';
import bg from './assets/bg/bg3.jpg';
import Competition from './pages/Competition';
import CreateCompPage from './pages/CreateCompPage';
import ApplyPage from './pages/ApplyPage';

// console.log(selectLoading);
function LayOut() {

  return (
    <>
    <div className={" " } style={{backgroundSize:"contain"}}>
      <Header />
      <div className="px-2 flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
  

  )
}

function Redirec() {
  const h = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {

    h('/login');

  }, [user])
  return (
    <div>jkhjkh</div>
  );
}

export default function App() {

  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const userdata=useSelector(selectUserdata);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const n = useNavigate();
  const auth = getAuth();
  // console.log(auth )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      dispatch(setLoading(true));

      if (authUser) {
        // User is signed in
        dispatch(setUserLoginData(authUser));
        const userDocRef = doc(firestore, 'users', authUser.email);
        const userDocSnap = await getDoc(userDocRef);
        console.log(userDocSnap)
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Set user data in the Redux store
          dispatch(setUserData(userData));

        } else {
          console.error('User document not found');
        }
        // Save user data to localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
      } else {
        // User is signed out
        dispatch(setUserLoginData(null));
        // Clear user data from localStorage
        localStorage.removeItem('authUser');
      }
      console.log(authUser)
      // Fetch additional user data from Firestore based on user type


      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (


    <>
      <Routes>
        {user ? (
          <>

            <Route path='/' element={<LayOut />}>
              <Route path='login' element={<Navigate to="/dashboard" />} />
              <Route path='signup' element={<Navigate to="/dashboard" />} />
              <Route index element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='competitions' element={<Competition/>} />
              <Route path='view-comp' element={<ViewComp />} />
              <Route path='dashboard' element={<div>Dashboard</div>} />
              {userdata.usertype=="student" ?(<>
                <Route path='my-comp' element={<ApplyPage/>} />
              </>):
              (<>
              </>)}
    
              <Route path='create-comp' element={<CreateCompPage/>} />
            </Route>
          </>
        ) : (
          <>

            <Route path='/' element={<LayOut />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Registration />} />
              <Route index element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='competitions' element={<Competition/>} />
              <Route path='view-comp' element={<ViewComp />} />
              {/* <Route path='dashboard' element={<Navigate to="/login" />} />
        <Route path='apply-comp' element={<Navigate to="/login" />} />
        <Route path='create-comp' element={<Navigate to="/login" />} /> */}
              <Route path='*' element={<Registration />} />
            </Route>

          </>
        )}

        {/* Always show this route for invalid paths */}
        <Route
          path='*'
          element={<div>Not verified, please login</div>}
          loader={() => {
            console.log("Not verified, please login");
          }}
        />
      </Routes>

      <Outlet />

      {loading && <Loader />}
    </>
  )
}
