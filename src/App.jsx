import React, { useEffect } from 'react'
import { Route,Routes,Outlet,useNavigate} from 'react-router-dom'
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
        
        <Route path='signup' element={<Registration/>} />
      <Route path='/' element={<LayOut/>}  >
        <Route index element={<div>Home</div>} />
        <Route path='search' element={<div>Search</div>}/>
        {  user &&  <Route>
                <Route path='dashboard' element={<div>Dashboard</div>} />
                <Route path='competitions' element={<div>Competitions</div>}/>
                <Route path='view-comp' element={<div>view</div>}/>
                <Route path='apply-comp' element={<div>view</div>}/>
                <Route path='create-comp' element={<div>view</div>}/>
            </Route>
        }
       
       
      </Route>
      <Route path='login' element={<Login />}/>
      <Route path='*' element={<div>dfg</div>}  loader={() => {
    console.log("ghjgk"); // "one/two"
  }}/>

    </Routes>
    <Outlet />
   
  {loading&&  <Loader/>}
   </>
  )
}
