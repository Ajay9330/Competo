import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseconfig/firebaseconfig'; // Firestore configuration
import CompCard from '../components/common/CompCard'; // Component to display each competition
import { selectLoading, setLoading, setMessage, setMessageType } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const Competition = () => {
  const [competitions, setCompetitions] = useState([]); // State to store competitions
  const loading = useSelector(selectLoading); // State to track loading status
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchCompetitions = async () => {
      dispatch(setLoading(true));
      if (!navigator.onLine) {
        dispatch(setMessage("Internet Connection Error!"));
        dispatch(setMessageType("error"));
        return;
      }
      try {
        const competitionsCollection = collection(firestore, 'competitions'); // Reference to 'competitions' collection
        const competitionsSnapshot = await getDocs(competitionsCollection); // Fetch all competition documents
        
        const competitionsData = competitionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Get competition data
        }));

        setCompetitions(competitionsData); // Store fetched competitions in state
        dispatch(setLoading(false)) // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching competitions:', error);
        dispatch(setLoading(false)); // Ensure loading state is cleared on error
        dispatch(setMessage(error));
      }
    };

    fetchCompetitions(); // Fetch competitions on component mount
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  if (loading) {
    return <div>Loading competitions...</div>; // Display loading message while fetching
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-indigo-400 bg-opacity-90 p-6">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 flex-wrap w-full sm:p-5">
        {competitions.map((competition) => (
          <CompCard key={competition.id} competition={competition} /> // Render each competition card
        ))}
      </div>
    </div>
  );
};

export default Competition;
