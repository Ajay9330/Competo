import React, { useEffect, useState } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, setLoading, setUserLoginData, setUserData, selectUser, selectUserdata, selectMessage } from './store';
import { firestore } from './firebaseconfig/firebaseconfig';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import Home from './pages/Home';
import Search from './pages/Search';
import ViewComp from './pages/ViewComp';
import Competition from './pages/Competition';
import CreateCompPage from './pages/CreateCompPage';
import ApplyPage from './pages/ApplyPage';
import Dash from './pages/Dash';
import Message from './components/common/Message';

function LayOut() {
  return (
    <>
      <div className={""} style={{ backgroundSize: "contain" }}>
        <Header />
        <div className="px-2 flex">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

function Redirec() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    navigate('/login');
  }, [user, navigate]);
  return <div>jkhjkh</div>;
}

export default function App() {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const userdata = useSelector(selectUserdata);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const auth = getAuth();

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
              <Route path='competitions' element={<Competition />} />
              <Route path='view-comp' element={<ViewComp />} />
              <Route path='dashboard' element={<Dash />} />
              {userdata && userdata.usertype === "student" && (
                <>
                  <Route path='my-comp' element={<ApplyPage />} />
                </>
              )}
              {userdata && userdata.usertype === "student" && (
                <>
                  <Route path='create-comp' element={<CreateCompPage />} />
                </>
              )}
            </Route>
          </>
        ) : (
          <>
            <Route path='/' element={<LayOut />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Registration />} />
              <Route index element={<Home />} />
              <Route path='search' element={<Search />} />
              <Route path='competitions' element={<Competition />} />
              <Route path='view-comp' element={<ViewComp />} />
              <Route path='*' element={<Registration />} />
            </Route>
          </>
        )}
        <Route
          path='*'
          element={<div>Not verified, please login</div>}
          loader={() => {
            console.log("Not verified, please login");
          }}
        />
      </Routes>
      <Outlet />
      {message && <Message />}
      {loading && <Loader />}
    </>
  );
}
