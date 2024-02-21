import React, { useEffect } from 'react'
import { Route,Routes,Outlet,useNavigate, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {selectUser} from './store'
import {app} from './firebaseconfig/firebaseconfig';
import Loader from './components/common/Loader';
import { selectLoading,setLoading,setUser } from './store';
import {  useSelector ,useDispatch} from 'react-redux';
import { onAuthStateChanged,getAuth } from 'firebase/auth';
// console.log(selectLoading);
function LayOut() {
 
  return (
    <>
  
     <Header />
     <Outlet/>
     <Footer/>
    


    </>
     
  )
}

function Redirec(){
  const h=useNavigate();
  const user = useSelector(selectUser);
  useEffect(()=>{
     
        h('/login');
   
  },[user])
  return(
    <div>jkhjkh</div>
  );
}

export default function App() {

  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const n=useNavigate();
  const auth = getAuth();
  console.log(auth )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      dispatch(setLoading(true));

      if (authUser) {
        // User is signed in
        dispatch(setUser(authUser));
        // Save user data to localStorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
      } else {
        // User is signed out
        dispatch(setUser(null));
        // Clear user data from localStorage
        localStorage.removeItem('authUser');
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
   

   <>
  <Routes>
  {user ? (
    <>
      <Route path='login' element={<Navigate to="/dashboard" />} />
      <Route path='signup' element={<Navigate to="/dashboard" />} />
      <Route path='/' element={<LayOut />}>
        <Route index element={<div>Home</div>} />
        <Route path='search' element={<div>Search</div>} />
        <Route path='competitions' element={<div>Competitions</div>} />
        <Route path='view-comp' element={<div>View</div>} />
        <Route path='dashboard' element={<div>Dashboard</div>} />
        <Route path='apply-comp' element={<div>Apply Competition</div>} />
        <Route path='create-comp' element={<div>Create Competition</div>} />
      </Route>
    </>
  ) : (
    <>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Registration />} />
      <Route path='/' element={<LayOut />}>
        <Route index element={<div>Home</div>} />
        <Route path='search' element={<div>Search</div>} />
        <Route path='competitions' element={<div>Competitions</div>} />
        <Route path='view-comp' element={<div>View</div>} />
        <Route path='dashboard' element={<Navigate to="/login" />} />
        <Route path='apply-comp' element={<Navigate to="/login" />} />
        <Route path='create-comp' element={<Navigate to="/login" />} />
       
      </Route>
      <Route path='*' element={<div>Not verified, please login</div>} />
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
   
  {loading&&  <Loader/>}
   </>
  )
}
