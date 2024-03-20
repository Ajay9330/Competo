import React, { useState } from 'react';
import StudentRegistrationForm from '../components/registrations/StudentRegistrationForm';
import CollegeRegistrationForm from '../components/registrations/CollegeRegistrationFrom';

export default function Registration() {
  const [selectStudent, setSelectStudent] = useState(true);

 

  return (
    <div className='flex   flex-col  w-full'>
      
      
        <ul className=" flex gap-12  px-20 py-4 justify-center">
          <div className='text-white gap-12 sticky top-0 flex bg-gray-500 px-6 py-2 rounded-lg bg-opacity-40  backdrop-blur-2xl border-2'>
          <li
            onClick={()=>{setSelectStudent(true)}}
            className={`cursor-pointer px-2 p-1 ${selectStudent ? 'bg-gray-700 text-white  border-blue  rounded-lg' : 'bg-gray-500 rounded-lg'}`}
          >
            Student
          </li>
          <li
           onClick={()=>{setSelectStudent(false)}}
           className={`cursor-pointer ${!selectStudent ? 'bg-gray-700 text-white  border-blue px-2 p-1 rounded-lg' : 'bg-gray-500   px-2 p-1 rounded-lg'}`}
          >
            College
          </li>
          </div>
         
        </ul>
    <div className=' pt-6 flex justify-center'>
    {selectStudent ? <StudentRegistrationForm /> : <CollegeRegistrationForm />}
    </div>
     

    </div>
  );
}
