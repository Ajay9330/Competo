import React, { useState } from 'react';
import StudentRegistrationForm from '../components/registrations/StudentRegistrationForm';
import CollegeRegistrationForm from '../components/registrations/StudentRegistrationForm';

export default function Registration() {
  const [selectStudent, setSelectStudent] = useState(true);

  const handleToggle = () => {
    setSelectStudent(!selectStudent);
  };

  return (
    <div className='flex justify-center items-center flex-col m-20 bg-blue-100 gap-20 p-28'>
      <h2>Registration Page</h2>
      <div>
        <ul className="flex gap-12">
          <li
            onClick={handleToggle}
            className={`cursor-pointer ${selectStudent ? 'bg-blue-300' : 'bg-blue-400'}`}
          >
            Student
          </li>
          <li
            onClick={handleToggle}
            className={`cursor-pointer ${selectStudent ? 'bg-blue-400' : 'bg-blue-300'}`}
          >
            College
          </li>
        </ul>
      </div>
      {selectStudent ? <StudentRegistrationForm /> : <CollegeRegistrationForm />}
    </div>
  );
}
