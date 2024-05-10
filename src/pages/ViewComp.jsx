import React, { useEffect, useState } from 'react';
import CreateCompPage from './CreateCompPage';
import { useParams } from 'react-router-dom';
import { getDoc,doc } from 'firebase/firestore';

import { firestore } from '../firebaseconfig/firebaseconfig';
export default function ViewComp() {
    // const compinfo = {
    //     title: "Hackathon | CTF",
    //     startRegistrationDate: "2024-04-10",
    //     endRegistrationDate: "2024-04-15",
    //     competitionDate: "2024-05-01",
    //     location: "Online",
    //     duration: "2 days",
    //     organizerteam: "Tech Club",
    //     category: "Programming",
    //     website: "https://example.com",
    //     prize: "Cash prize of $1000",
    //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga ducimus expedita saepe odio veniam laborum vel perferendis consectetur fugit recusandae nemo, alias unde sit quam aut voluptatum! Asperiores, recusandae voluptas?",
    //     collegeId: "ACM001",
    //     rules: [
    //         "Participants must be students of any recognized college or university.",
    //         "Participants must register before the end registration date to be eligible for the competition.",
    //         "The competition will be conducted online.",
    //         "All submissions must adhere to the guidelines provided by the organizers."
    //     ],
    //     contact: "John Doe (johndoe@example.com)",
    //     eligibility: "Open to college students from all over the world",
    //     collegeimg: "https://via.placeholder.com/100", // Placeholder URL for college logo
    //     compimg: "https://via.placeholder.com/800x400", // Placeholder URL for competition image
    //     // ...colllegedata
    // };
    const { id } = useParams(); // Destructure id from useParams
 
    const [compinfo, setCompinfo] = useState({
        title: "Loading...",
        startRegistrationDate: "Loading...",
        endRegistrationDate: "Loading...",
        competitionDate: "Loading...",
        location: "Loading...",
        duration: "Loading...",
        organizerteam: "Loading...",
        category: "Loading...",
        website: "Loading...",
        prize: "Loading...",
        description: "Loading...",
        collegeId: "Loading...",
        rules: [],
        contact: "Loading...",
        eligibility: "Loading...",
        compimg: "https://via.placeholder.com/8"
    });
    const [collegeInfo, setCollegeInfo] = useState({
      collegeimg: 'https://via.placeholder.com/100', // Default image URL
    })
    useEffect(() => {
        const fetchCompInfo = async () => {
          try {
            if (id && id.trim()) { // Ensure 'id' is valid and not empty
              const compDocRef = doc(firestore, 'competitions', id.trim()); // Valid reference
              const compDocSnap = await getDoc(compDocRef);
    
              if (compDocSnap.exists()) {
                setCompinfo(compDocSnap.data());
                
                const  collegeId  = compDocSnap.data().collegeId; // Get `collegeId` from competition data
                console.log(compDocSnap.data())
                if (collegeId) {
                  const collegeDocRef = doc(firestore, 'users', collegeId.trim()); // Get the college document
                  const collegeDocSnap = await getDoc(collegeDocRef);
    
                  if (collegeDocSnap.exists()) {
                    const collegeData = collegeDocSnap.data();
                    setCollegeInfo({
                      collegeimg: collegeData.image || 'https://via.placeholder.com/100', // Fetch college image

                    });
                    console.log(collegeData)
                  } else {
                    console.error('College document not found!');
                  }}
              } else {
                console.error("Competition document not found!");
              }
              
            } else {
              console.error("Invalid document reference. ID is undefined or empty.");
            }
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        };
    
        fetchCompInfo();
      }, [id]); // Ensure 'id' is in dependency array
    
    return (
      <div className="mx-auto w-full  text-gray-800">
          <div className="container mx-auto  ">
            <div className='  '>
                <div className=" bg-zinc-900 p-6 py-2 flex items-center justify-between border-b-[2px] border-zinc-700 ">
                      <div>
                          <img src={collegeInfo.collegeimg} alt="College Logo" className="w-12 h-12 rounded-full" />
                      </div>
                      <div>
                          <h1 className="text-3xl font-semibold text-center">{compinfo.collegeName}</h1>
                      </div>
                      <div></div>
                  </div>
                  <div className="bg-cover bg-center h-64 relative" style={{backgroundImage: `url(${compinfo.compimg})`}}>
                      <div className="absolute inset-0 bg-black opacity-40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <h1 className="text-green-100 shadow-blue-50  drop-shadow-2xl  text-3xl md:text-6xl font-bold text-center">{compinfo.title}</h1>
                      </div>
                  </div>
            </div>
             
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                    <div className="border p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-3xl font-bold mb-4">Details</h2>
                        <p className="mb-2"><strong className="font-semibold">Start Registration Date:</strong> {compinfo.startRegistrationDate}</p>
                        <p className="mb-2"><strong className="font-semibold">End Registration Date:</strong> {compinfo.endRegistrationDate}</p>
                        <p className="mb-2"><strong className="font-semibold">Competition Date:</strong> {compinfo.competitionDate}</p>
                        <p className="mb-2"><strong className="font-semibold">Location:</strong> {compinfo.location}</p>
                        <p className="mb-2"><strong className="font-semibold">Duration:</strong> {compinfo.duration}</p>
                        <p className="mb-2"><strong className="font-semibold">Category:</strong> {compinfo.category}</p>
                    </div>
                </div>
                <div>
                    <div className="border p-6 rounded-lg shadow-md bg-white">
                        <h2 className="text-3xl font-bold mb-4">Additional Information</h2>
                        <p className="mb-2"><strong className="font-semibold">Prize:</strong> {compinfo.prize}</p>
                        <p className="mb-2"><strong className="font-semibold">Organizer-team:</strong> {compinfo.organizerteam}</p>
                        <p className="mb-2"><strong className="font-semibold">College ID:</strong> {compinfo.collegeId}</p>
                        <p className="mb-2"><strong className="font-semibold">Contact:</strong> {compinfo.contact}</p>
                        <p className="mb-2"><strong className="font-semibold">Eligibility:</strong> {compinfo.eligibility}</p>
                        <p className="mb-2"><strong className="font-semibold">Website:</strong> <a href={compinfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{compinfo.website}</a></p>
                    </div>
                </div>
            </div>
            <div className='w-full  justify-center p-4 flex items-center'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md  hover:bg-blue-600">Apply Now</button>

            </div>

            <div className="border p-6 rounded-lg shadow-md bg-white ">
                <p className="mb-2"><strong className="font-semibold">Description:</strong> {compinfo.description}</p>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Rules</h2>
                    <ul className="list-disc pl-4">
                        {compinfo.rules.map((rule, index) => (
                            <li key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
          {/* <CreateCompPage/> */}
      </div>

    );
}
