import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseconfig/firebaseconfig';
import { useSelector } from 'react-redux';
import cardbg from '../../assets/bg/mainbg.svg'; // Default background
import { selectUser } from '../../store';

export default function CompCard({ competition }) {
  const [collegeImage, setCollegeImage] = useState(cardbg);
  const [isApplied, setIsApplied] = useState(false);
  const userData = useSelector(selectUser);

  const fetchCollegeImage = async () => {
    if (competition.collegeId) {
      try {
        const collegeDocRef = doc(firestore, 'users', competition.collegeId);
        const collegeDocSnap = await getDoc(collegeDocRef);

        if (collegeDocSnap.exists()) {
          const collegeData = collegeDocSnap.data();
          setCollegeImage(collegeData.image || cardbg); // Fallback to default image
        }
      } catch (error) {
        console.error('Error fetching college image:', error);
      }
    }
  };

  const checkIfApplied = async () => {
    try {
      const competitionDocRef = doc(firestore, 'competitions', competition.id);
      const competitionDocSnap = await getDoc(competitionDocRef);

      if (competitionDocSnap.exists()) {
        const competitionData = competitionDocSnap.data();
        const applicants = competitionData.applicants || [];

        setIsApplied(applicants.includes(userData?.email));
      }
    } catch (error) {
      console.error('Error fetching competition data:', error);
    }
  };

  const handleApply = async () => {
    if (!userData?.email) {
      console.error('User email is undefined');
      return;
    }

    try {
      const competitionDocRef = doc(firestore, 'competitions', competition.id);
      await updateDoc(competitionDocRef, {
        applicants: arrayUnion(userData.email),
      });
      setIsApplied(true);
    } catch (error) {
      console.error('Error applying to competition:', error);
    }
  };

  useEffect(() => {
    fetchCollegeImage(); // Fetch college image
    checkIfApplied(); // Check if the user has applied
  }, []);

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-zinc-700 text-white rounded-xl p-4 w-full max-w-[500px] mx-auto">
      {/* College Image and General Information */}
      <div className="flex items-center border-y-[1px] border-slate-700 px-4 py-3">
        <img
          src={collegeImage}
          alt="College Logo"
          className="w-16 h-16 rounded-full"
        />
    <div className="pl-4 flex flex-col  text-gray-300 w-full ">
          <h3 className="text-blue-300 font-bold sm:text-lg capitalize flex-1 w-full"><span>{competition.title}</span></h3>
          <div className=' grid-cols-2 grid w-full gap-4'>
          <p className="text-[12px] text-blue-900 bg-green-100 border-2 border-green-500 rounded font-black py-[2px] px-2">Start Date: <span className=' font-semibold text-zinc-900'>{competition.startRegistrationDate}</span></p>
          <p className="text-[12px] text-blue-900 bg-green-100 border-2 border-green-500 rounded font-black py-[2px] px-2">End Date: <span className=' font-semibold text-zinc-900'>{competition.endRegistrationDate}</span></p>
          <p className="text-[12px] text-blue-900 bg-green-100 border-2 border-green-500 rounded font-black py-[2px] px-2">Duration: <span className=' font-semibold text-zinc-900'>{competition.duration}</span></p>
          <p className="text-[12px] text-blue-900 bg-green-100 border-2 border-green-500 rounded font-black py-[2px] px-2">Prize: <span className=' font-semibold text-zinc-900'>{competition.prize}</span></p>
    
          </div>
             </div>
      </div>

      {/* Description Section */}
      <div className="mt-4">
        <p className="bg-gray-300 text-black rounded-md line-clamp-3 p-1">
          <span className="text-blue-600 font-medium">Description:</span> {competition.description}
        </p>
      </div>

      {/* Actions Section */}
      <div className="pt-4 flex justify-around">
        <Link
          className="hover:bg-blue-500 bg-blue-400 text-white py-[2px] px-2 rounded-lg"
          to={`${competition.id}`}
        >
          View
        </Link>
        <button
          className={`bg-green-500 text-white py-[2px] px-2 rounded-lg hover:bg-green-600 ${
            isApplied ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleApply}
          disabled={isApplied} // Disable if already applied
        >
          {isApplied ? 'Applied' : 'Apply'}
        </button>
      </div>

      {/* Rules Section */}
      <div className="">
        <span className="text-white font-bold">Rules:</span>
        <ul className="list-disc pl-4 leading-tight  text-white">
          {competition.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
