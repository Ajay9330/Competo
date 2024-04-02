import React, { useEffect,useState } from 'react'
import { Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { selectMessage, selectUser } from './store'
import { firestore } from './firebaseconfig/firebaseconfig';
import Loader from './components/common/Loader';
import { selectLoading, setLoading, setUserLoginData, setUserData,selectUserdata } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDoc, doc,collection,onSnapshot } from 'firebase/firestore'
import Home from './pages/Home';
import Search from './pages/Search';
import ViewComp from './pages/ViewComp';
import bg from './assets/bg/bg3.jpg';
import Competition from './pages/Competition';
import CreateCompPage from './pages/CreateCompPage';
import ApplyPage from './pages/ApplyPage';
import Dash from './pages/Dash';
import Message from './components/common/Message';

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
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const userdata = useSelector(selectUserdata);
  const dispatch = useDispatch();
  const auth = getAuth();
  const message=useSelector(selectMessage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const authUser = await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            resolve(user);
            unsubscribe();
          });
        });

        if (authUser) {
          dispatch(setUserLoginData(authUser));
          const userDocRef = doc(firestore, 'users', authUser.email);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            dispatch(setUserData(userData));

            const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                const updatedUserData = doc.data();
                dispatch(setUserData(updatedUserData));
              } else {
                console.error('User document not found');
              }
            });

            // Set initial data loaded to true after fetching initial data
            setInitialDataLoaded(true);

            return () => unsubscribeSnapshot();
          } else {
            console.error('User document not found');
          }

          localStorage.setItem('authUser', JSON.stringify(authUser));
        } else {
          dispatch(setUserLoginData(null));
          dispatch(setUserData(null));
          localStorage.removeItem('authUser');
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, auth]);

  // Set loading to false after initial data is loaded
  useEffect(() => {
    if (initialDataLoaded) {
      dispatch(setLoading(false));
    }
  }, [initialDataLoaded, dispatch]);
  
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
              <Route path='dashboard' element={<Dash/>} />
              {userdata && userdata.usertype=="student"&& (<>
                
                <Route path='my-comp' element={<ApplyPage/>} />
              </>)}
              {userdata && userdata.usertype=="student" &&(<>
                <Route path='create-comp' element={<CreateCompPage/>} />
              </>)}

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
      {message && <Message/>}
      {loading && <Loader />}
    </>
  )
}
