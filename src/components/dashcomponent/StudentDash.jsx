import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserdata } from './../../store';
import CollegeRegForm from '../completeprofile/CompleteRegCollege';
import StudentRegForm from '../completeprofile/CompleteRegStudent';
import { Link } from 'react-router-dom';

export default function StudentDash() {
  const studentData = useSelector(selectUserdata);
  const [visible,setvisible]=useState(false);

  return (
    <>
      {studentData?.profileCompleted &&   
      <div className="container mx-auto px-4 py-8 ">
        <div className='flex items-center w-full p-10 mb-8 bg-blue-300 flex-col '>
            <div className='rounded-full h-52 w-52 border-2 border-black object-fill '><img className='w-full h-full rounded-full' src={studentData.image} alt="" srcset="" /></div>
            
            <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-3 w-full ">
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Student Name:</span> {studentData.firstName}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Email:</span> {studentData.email}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Phone Number:</span> {studentData.phoneNumber}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Address:</span> {studentData.address}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">City:</span> {studentData.city}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">State:</span> {studentData.state}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Zip Code:</span> {studentData.zipCode}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Country:</span> {studentData.country}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Year:</span> {studentData.year}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Course:</span> {studentData.course}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Contact:</span> {studentData.contact}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">College:</span> {studentData.college}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Department:</span> {studentData.department}</p>
            </div>

            {/* <p className="bg-blue-50 rounded-sm rounded-r-full h-fit p-2 font-black text-center items-center flex justify-center flex-1 mx-5  text-4xl sm:text-5xl  ">
                     <span className="text-[#005FC5] "> {studentData.fullName}</span></p> */}
      </div>
       
      {/* <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4">
        <h3 className="text-4xl font-bold text-blue-900 rounded-sm pt-6 ">Student Information</h3>

          <div className=" shadow-md rounded-lg overflow-hidden bg-gradient-to-br  to-[#ffffff00] from-[#ffffff]">
            <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-3 ">
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Student Name:</span> {studentData.firstName}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Email:</span> {studentData.email}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Phone Number:</span> {studentData.phoneNumber}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Address:</span> {studentData.address}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">City:</span> {studentData.city}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">State:</span> {studentData.state}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Zip Code:</span> {studentData.zipCode}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Country:</span> {studentData.country}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Year:</span> {studentData.year}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Course:</span> {studentData.course}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Contact:</span> {studentData.contact}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">College:</span> {studentData.college}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Department:</span> {studentData.department}</p>
            </div>
          </div>
        </div>
      </div> */}
   
    <div className='flex mt-24 gap-4 w-full flex-wrap justify-center'>
      <div className='' style={{width:`${visible?"100%":""}`}}>
        <div className=' flex text-zinc-900 shadow-2xl shadow-black  items-center text-4xl gap-6 bg-green-500 rounded-full p-3 w-fit' >
        <h1 className=' font-bold'>My Competitions</h1>
      <span
        onClick={() => setvisible((prev) => !prev)} 
        className="material-symbols-outlined cursor-pointer text-3xl text-blue-900 bg-white rounded-full px-2 hover:bg-zinc-300 transition-all"
      >
        {!visible ? 'visibility_off' : 'visibility'} 
      </span>
        </div>
        { visible &&
          <div className='flex flex-wrap space gap-6 bg-yellow-200 p-6 text-xl text-white'>
            {studentData.competitions.map(x=>(
              <li className=' list-none   bg-zinc-900  rounded-3xl py-2 p-4 text-green-300 font-bold  '>
                
                <Link className=' rounded-full px-2 hover:bg-white hover:text-blue-800 hover:underline' to={`../competitions/${x.id}`}>{x.title}</Link>
                <li className='text-sm px-2 text-white font-mono '>{new Date(x.timestamp).toLocaleDateString()} {new Date(x.timestamp).toLocaleTimeString()}</li>

               
                </li>
            )
            )}
          </div>
        }
 
      </div>
      <div className='px-12 shadow-2xl shadow-green-900 flex font-bold text-green-400 items-center text-4xl gap-12 bg-zinc-900 rounded-full p-3 w-fit'>
        Go to Messages
      </div>
    </div>
    </div>
    }
      {!studentData?.profileCompleted && <StudentRegForm />}
    </>
  );
}
