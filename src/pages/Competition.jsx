import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseconfig/firebaseconfig'; // Firestore configuration
import CompCard from '../components/common/CompCard'; // Component to display each competition

const Competition = () => {
  const [competitions, setCompetitions] = useState([]); // State to store competitions
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const competitionsCollection = collection(firestore, 'competitions'); // Reference to 'competitions' collection
        const competitionsSnapshot = await getDocs(competitionsCollection); // Fetch all competition documents
        
        const competitionsData = competitionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Get competition data
        }));

        setCompetitions(competitionsData); // Store fetched competitions in state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching competitions:', error);
        setLoading(false); // Ensure loading state is cleared on error
      }
    };

    fetchCompetitions(); // Fetch competitions on component mount
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  if (loading) {
    return <div>Loading competitions...</div>; // Display loading message while fetching
  }

  return (
    <div className="flex-1">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 flex-wrap w-full sm:p-5">
        {competitions.map((competition) => (
          <CompCard key={competition.id} competition={competition} /> // Render each competition card
        ))}
      </div>
    </div>
  );
};

export default Competition;
