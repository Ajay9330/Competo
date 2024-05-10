import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseconfig/firebaseconfig';
import { useDispatch, useSelector } from 'react-redux';
import cardbg from '../../assets/bg/mainbg.svg'; // Default background
import { selectUser, selectUserdata, setMessage, setMessageType } from '../../store';


export default function CompCard({ competition }) {
  const [collegeImage, setCollegeImage] = useState(cardbg);
  const [isApplied, setIsApplied] = useState(false);
  const userData = useSelector(selectUserdata);
  const navigate=useNavigate()
  const dispatch=useDispatch();
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
      navigate('/signup');
      console.error('User email is undefined');
      return;
    }
    if(userData.usertype!="student"){
      console.log(userData);
      dispatch(setMessage("you are not student"));
      dispatch(setMessageType("error"));
      return;
    }

    try {
      const competitionDocRef = doc(firestore, 'competitions', competition.id);
      await updateDoc(competitionDocRef, {
        applicants: arrayUnion(userData.email),
      });
      const timestamp = Date.now(); // Get the current timestamp
      const userDocRef = doc(firestore, 'users', userData.email);
      await updateDoc(userDocRef, {
        competitions: arrayUnion({
          id: competition.id,
          title: competition.title,
          timestamp: timestamp // Use the timestamp obtained above
        })
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
    <div className="bg-gradient-to-br from-white  to-white text-black rounded-xl p-4 w-full max-w-[500px] mx-auto">
      {/* College Image and General Information */}
      <div className="flex items-center border-y-[1px] border-slate-700 px-4 py-3">
        <img
          src={collegeImage}
          alt="College Logo"
          className="w-16 h-16 rounded-full"
        />
    <div className="pl-4  flex flex-col  text-gray-300 w-full ">
          <h3 className="text-blue-700 font-black pb-4 sm:text-xl capitalize flex-1 w-full"><span>{competition.title}</span></h3>
          <div className=' md:grid-cols-2 grid w-full rounded-sm border-[1px] border-green-500 '>
          <p className="text-[12px] text-blue-900 flex items-center   bg-green-100 font-black py-[2px] px-0">
              <span class="material-symbols-outlined">calendar_month</span> Start Date: 
              <span className="font-semibold text-zinc-900">{competition.startRegistrationDate}</span>
            </p>
            <p className="text-[12px] text-blue-900 flex items-center bg-green-100 font-black py-[2px] px-0">
            <span class="material-symbols-outlined">calendar_month</span> End Date: 
              <span className="font-semibold text-zinc-900">{competition.endRegistrationDate}</span>
            </p>
            <p className="text-[12px] text-blue-900 flex items-center bg-green-100 font-black py-[2px] px-0">
            <span class="material-symbols-outlined">schedule</span> Duration:
              <span className="font-semibold text-zinc-900">{competition.duration}</span>
            </p>
            <p className="text-[12px] text-blue-900 flex items-center bg-green-100 font-black py-[2px] px-0">
            <span class="material-symbols-outlined">emoji_events</span> Prize: 
              <span className="font-semibold text-zinc-900">{competition.prize}</span>
            </p>
          </div>
             </div>
      </div>

      {/* Description Section */}
      <div className="mt-2">
        <p className="bg-gray-100 text-[14px] text-black rounded-md line-clamp-3 p-1">
          <span className="text-blue-700 text-base font-bold ">Description:</span> {competition.description}
        </p>
      </div>

      {/* Actions Section */}
      <div className="pt-2 flex justify-around">
        <Link
          className="hover:bg-blue-500 hover:text-white bg-blue-200 border-2 text-blue-900 shadow-lg  py-[2px] px-2 rounded-lg "
          to={`${competition.id}`}
        >
          View
        </Link>
        <button
          className={`bg-green-400 shadow-lg border-2 flex items-center text-black py-[2px] px-2 rounded-md hover:text-white hover:bg-green-600 ${
            isApplied ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleApply}
          disabled={isApplied} // Disable if already applied
        > {isApplied ? (
          <>
            <span class="material-symbols-outlined">task_alt</span> Applied
          </>
        ) : (
          <>
            <span class="material-symbols-outlined">add_circle</span> Apply
          </>
        )}
        </button>
      </div>

      {/* Rules Section */}
      <div className="">
        <span className="text-black font-bold">Rules:</span>
        <ul className="list-disc pl-4 leading-tight  text-[12px]">
          {competition.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
