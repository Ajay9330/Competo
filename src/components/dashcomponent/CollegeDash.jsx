import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser,selectUserdata } from './../../store';
import CollegeRegForm from '../completeprofile/CompleteRegCollege';
import { Link } from 'react-router-dom';

export default function StudentDash() {
  const collegeData = useSelector(selectUserdata);

  return (
    <>
      {collegeData?.profileCompleted &&   
      <div className="container mx-auto px-4 py-8 ">
        <div className='flex items-center w-full rounded-full mb-8 border-[2px] border-blue-200 '>
        <div className='rounded-full h-20 w-20  min-h-20 min-w-20 object-fill border-2  bg-blue-100'><img className=' w-full h-full object-cover rounded-full ' src={collegeData.image} alt="" srcset="" /></div>
            <p
                    class="bg-blue-50 rounded-sm rounded-r-full h-fit p-2 font-black text-center items-center flex justify-center flex-1 mx-5  text-4xl sm:text-5xl  ">
                     <span class="text-[#005FC5] "> {collegeData.CollegeName}</span></p>
  
        </div>
       
      <div className=" mx-auto">
        <div className="grid grid-cols-1 gap-4 ">
        <h3 className="text-4xl font-bold text-blue-900 rounded-sm pt-6 ">College Information</h3>

          <div className="bg-white shadow-md rounded-lg overflow-hidden bg-gradient-to-br to-zinc-200 from-white">
            <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-3 ">
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className=" md:text-xl font-bold text-zinc-800">Email:</span> {collegeData.email}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Phone Number:</span> {collegeData.phoneNumber}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Address:</span> {collegeData.address}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">City:</span> {collegeData.city}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">State:</span> {collegeData.state}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Zip Code:</span> {collegeData.zipCode}</p>
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">Country:</span> {collegeData.country}</p>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-blue-900 pt-6 rounded-sm ">Department Information</h3>

          <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-blue-400">
          
            <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-3 ">
              <p className='bg-blue-200 rounded-lg px-4 py-2'><span className="font-semibold">Department:</span> {collegeData.department}</p>
              <p className='bg-blue-200 rounded-lg px-4 py-2'><span className="font-semibold">About College:</span> {collegeData.aboutCollege}</p>
            </div>
          </div>
        </div>
      </div>
        <div className='bg-zinc-600 w-full mt-20 p-4 justify-around '>
            <Link className='bg-zinc-900 p-2 border-zinc-200 text-white rounded-md' to="/create-comp">Create Competitions</Link>
            <Link to=""></Link>
        </div>
    </div>
    
    }
      {!collegeData?.profileCompleted && <CollegeRegForm />}
    </>
  );
}
