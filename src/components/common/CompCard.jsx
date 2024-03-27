import { getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import cardbg from '../../assets/bg/mainbg.svg';
import { Link } from 'react-router-dom';

export default function CompCard({ competition }) {
  async function setCollegeInfo() {
    try {
      await getDoc('college/' + competition.collegeId); // Corrected the path to access college ID
    } catch (error) {
      console.log(error);
    } finally {
      console.log("success");
    }
  }

  useEffect(() => {
    setCollegeInfo();
  }, []); // Added empty dependency array to run the effect only once

  return (
    <div  className="  bg-black bg-opacity-90 backdrop-blur-3xl text-white  rounded-xl  p-4 w-full max-w-[500px] mx-auto">
      <div className="flex w-full  items-center border-y-[1px]  border-slate-700 px-4 ">
        <img src={cardbg} alt="collegelogo" className="min-w-16  h-16" />
        <div className='p-3'>
        <h3 className=' text-blue-300 font-bold sm:text-2xl capitalize'>{competition.title}</h3>
        <p>Deadline-Remain:<span>{competition.endRegistrationDate-competition.startregistrationDate }</span></p>
        <p>competiton.coll</p>
        </div>
      </div>
      <div className='w-full '>
      </div>
      <p className=" mt-4 px-3 pb-2 rounded-md bg-gray-300 text-black line-clamp-2 sm:line-clamp-none"> <span className='text-blue-600 font-medium'>Description:</span> {competition.description}</p>
      <div className=" pt-4 w-full flex justify-around items-center">
      
        <Link className='hover:bg-blue-500 bg-blue-400 text-white px-4 py-1 rounded-lg' to="">View</Link>
        <Link to="">Apply</Link>
       
        {/* <span className="w-full">Rules:</span> */}
        {/* <ul className="list-disc list pl-6 leading-tight">
          {competition.rules.map((rule, index) => (
            <li key={index}>{rule}</li> 
          ))}
        </ul> */}
      </div>
    </div>
  );
}
