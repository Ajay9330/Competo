import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserdata } from './../../store';
import CollegeRegForm from '../completeprofile/CompleteRegCollege';
import StudentRegForm from '../completeprofile/CompleteRegStudent';

export default function StudentDash() {
  const studentData = useSelector(selectUserdata);

  return (
    <>
      {studentData?.profileCompleted &&   
      <div className="container mx-auto px-4 py-8 ">
        <div className='flex items-center w-full rounded-full mb-8 border-[2px] border-blue-200 '>
            <div className='rounded-full h-20 w-20  min-h-20 min-w-20 object-fill border-2  bg-blue-100'><img className=' ' src={studentData.image} alt="" srcset="" /></div>
            <p className="bg-blue-50 rounded-sm rounded-r-full h-fit p-2 font-black text-center items-center flex justify-center flex-1 mx-5  text-4xl sm:text-5xl  ">
                     <span className="text-[#005FC5] "> {studentData.fullName}</span></p>
        </div>
       
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4">
        <h3 className="text-4xl font-bold text-blue-900 rounded-sm pt-6 ">Student Information</h3>

          <div className="bg-white shadow-md rounded-lg overflow-hidden bg-gradient-to-br to-zinc-200 from-white">
            <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-3 ">
              <p className='border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2'><span className="md:text-xl font-bold text-zinc-800">College Name:</span> {studentData.collegeName}</p>
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
      </div>
    </div>
    }
      {!studentData?.profileCompleted && <StudentRegForm />}
    </>
  );
}
