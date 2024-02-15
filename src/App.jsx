import React from 'react'
import { Route,Routes,Outlet} from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {store} from './store'
import {app} from './firebaseconfig/firebaseconfig';

console.log(store);
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
  return (
   
   <>
    <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Registration/>} />
      <Route path='/' element={<LayOut/>} onEnter={() => console.log('Entered /')}>
        <Route index element={<div>Home</div>} />

        <Route path='dashboard' element={<div>Dashboard</div>} />
        <Route path='competitions' element={<div>Competitions</div>}/>
        <Route path='search' element={<div>Search</div>}/>
        <Route path='view-comp' element={<div>view</div>}/>
        <Route path='apply-comp' element={<div>view</div>}/>
        <Route path='create-comp' element={<div>view</div>}/>

       
      </Route>

    </Routes>
    <Outlet />
   </>
  )
}
