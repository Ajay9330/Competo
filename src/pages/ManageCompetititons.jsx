import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserdata } from '../store';
import { Link } from 'react-router-dom';
import { collection, getDocs,getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { firestore as db } from '../firebaseconfig/firebaseconfig'; // Assuming you've set up Firebase in a separate file
import EditCompetition from './EditCompetition';
import * as XLSX from 'xlsx'; 


export default function ManageCompetitions() {
  const [competitions, setCompetitions] = useState([]);
  const collegeData = useSelector(selectUserdata);
  const [editingCompetition, setEditingCompetition] = useState(null);

  const exportToExcel = (data, filename) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participants');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const fetchDataForDownload = async (competitionId) => {
    try {
      const competitionDocRef = doc(db, 'competitions', competitionId);
      const competitionDocSnap = await getDoc(competitionDocRef);
      if (!competitionDocSnap.exists()) {
        console.error('Competition document does not exist');
        return null;
      }
  
      const participantsCollectionRef = collection(db, `competitions/${competitionId}/participants`);
      const participantsQuerySnapshot = await getDocs(participantsCollectionRef);
      const participantsData = [];
  
      participantsQuerySnapshot.forEach((participantDoc) => {
        const { email, name } = participantDoc.data();
        participantsData.push({ email, name });
      });
  
      return participantsData;
    } catch (error) {
      console.error('Error downloading data:', error);
      return null;
    }
  };
  
  const downloadData = async (competitionId,applicants) => {
    try {
    
      const participantsData = [];
    // console.log(applicants);
      // Fetch participant details from the users collection
      const promises = applicants.map(async (d) => {
        const userId = d;
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          participantsData.push(userData);
        //   console.log(userData)
        } else {
          console.warn(`User document with ID ${userId} does not exist.`);
        }
      });
  
      // Wait for all participant details to be fetched
      await Promise.all(promises);
  
      if (participantsData.length > 0) {
        // Export participant data to Excel
        exportToExcel(participantsData, `competition_${competitionId}_participants.xlsx`);
      } else {
        console.warn('No participant data found.');
      }
    } catch (error) {
      console.error('Error downloading data:', error);
    }
  };
  

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionsRef = collection(db, 'competitions');
        const q = query(competitionsRef, where('collegeId', '==', collegeData.email));
        const querySnapshot = await getDocs(q);
        const competitionList = [];
        querySnapshot.forEach((doc) => {
          competitionList.push({ id: doc.id, ...doc.data() });
        //   console.log(competitionList)
        });
        setCompetitions(competitionList);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, [collegeData]);

  const deleteCompetition = async (competitionId) => {
    try {
      await deleteDoc(doc(db, 'competitions', competitionId));
      setCompetitions(competitions.filter(comp => comp.id !== competitionId));
      console.log('Competition deleted successfully!');
    //   console.log(competitions)
    } catch (error) {
      console.error('Error deleting competition:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Manage Competitions</h1>
      {editingCompetition ? (
        <EditCompetition competitionId={editingCompetition} setEditingCompetition={setEditingCompetition} />
      ) : (
      <div className="text-sm grid  md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
        {competitions.map(competition => (
            
        <div 
            style={{ '--image-url': `url(${competition.compimg})` }} 
            className="  bg-white  rounded-md shadow-md"
            >
            <div className=' rounded-3xl backdrop-blur-3xl bg-white bg-opacity-80 p-6'>

            <h2 className="text-xl font-bold">{competition.title}</h2>
            <p className="mb-2 line-clamp-2">{competition.description}</p>
            <div className="flex justify-between mb-4 h-12 ">
              <Link to={`/competitions/${competition.id}`} className="text-blue-600 hover:text-4xl h-fit  material-symbols-outlined">open_run</Link>
        
                <div   className=" mr-2 gap-7 flex">
                <button onClick={() => downloadData(competition.id,competition.applicants)} class=" text-blue-600 hover:underline cursor-pointer material-symbols-outlined">download</button>
                <button onClick={() => setEditingCompetition(competition.id)} class=" text-blue-600 hover:underline cursor-pointer material-symbols-outlined">edit</button>
                <button  className=""><span onClick={() => deleteCompetition(competition.id)} class=" text-red-600 hover:underline material-symbols-outlined">delete_forever</span></button>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="font-bold">Start Date:</span> {(competition.startRegistrationDate)}
              </div>
              <div>
                <span className="font-bold">End Date:</span> {(competition.endRegistrationDate)}
              </div>
            </div>
            <div className="mt-2">
              <span className="font-bold">Participants:</span> {competition.applicants ? competition.applicants.length : 0}
            </div>

            </div>   
              
        </div>

        ))}
      </div>)}
      <div className="mt-6">
        <Link to="/create-comp" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Create New Competition</Link>
      </div>
    </div>
  );
}
