import React, { useState } from 'react';
import StudentRegistrationForm from '../components/registrations/StudentRegistrationForm';
import CollegeRegistrationForm from '../components/registrations/CollegeRegistrationFrom';

export default function Registration() {
  const [selectStudent, setSelectStudent] = useState(true);

 

  return (
    <div className='flex   flex-col  w-full'>
      
      
        <ul className="flex gap-12 bg-blue-400 px-20 py-4 justify-center">
          <li
            onClick={()=>{setSelectStudent(true)}}
            className={`cursor-pointer ${selectStudent ? 'bg-blue-300 border-2 border-blue px-2 p-1 rounded-lg' : 'bg-blue-100   px-2 p-1 rounded-lg'}`}
          >
            Student
          </li>
          <li
           onClick={()=>{setSelectStudent(false)}}
            className={`cursor-pointer ${selectStudent ? 'bg-blue-100  px-2 p-1 rounded-lg' : 'bg-blue-300 border-2 border-blue px-2 p-1 rounded-lg'}`}
          >
            College
          </li>
        </ul>
    <div className='border-2 border-black pt-6 flex justify-center'>
    {selectStudent ? <StudentRegistrationForm /> : <CollegeRegistrationForm />}
    </div>
     

    </div>
  );
}
