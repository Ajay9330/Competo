import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore as db } from '../firebaseconfig/firebaseconfig'; // Assuming you've set up Firebase in a separate file

const EditCompetition = ({ competitionId, setEditingCompetition }) => {
  const [formData, setFormData] = useState({
    title: '',
    startRegistrationDate: '',
    endRegistrationDate: '',
    competitionDate: '',
    location: '',
    duration: '',
    organizerteam: '',
    category: '',
    website: '',
    prize: '',
    description: '',
    rules: [],
    contact: '',
    eligibility: '',
    keywords: '',
  });

  useEffect(() => {
    const fetchCompetitionData = async () => {
      try {
        const docRef = doc(db, 'competitions', competitionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let competitionData = docSnap.data();
          // Set the competition data in the form state
          const keysToRemove = ['applicants', 'collegeimg','compimg', 'collegeId']; // Add keys you want to remove here
        
        // Filter competition data to exclude keysToRemove
        competitionData = Object.keys(competitionData)
          .filter(key => !keysToRemove.includes(key))
          .reduce((obj, key) => {
            obj[key] = competitionData[key];
            return obj;
          }, {});
          setFormData(competitionData);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching competition data:', error);
      }
    };

    fetchCompetitionData();
  }, [competitionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRule = () => {
    setFormData({ ...formData, rules: [...formData.rules, ''] });
  };

  const handleRemoveRule = (index) => {
    const updatedRules = [...formData.rules];
    updatedRules.splice(index, 1);
    setFormData({ ...formData, rules: updatedRules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'competitions', competitionId);
      await updateDoc(docRef, formData);
      console.log('Competition updated successfully!');
      // Reset the editing state
      setEditingCompetition(null);
    } catch (error) {
      console.error('Error updating competition:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-green-200">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Edit Competition</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Render all editable fields */}
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            {key === 'rules' ? (
              <div className='md:grid grid-cols-2 gap-6'>
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex items-center mb-2 gap">
                    <input type="text" value={rule} onChange={(e) => handleChange({ target: { name: 'rules', value: e.target.value, index } })} className="border flex-1 border-gray-300 rounded-md py-2 px-3 mr-2" />
                    <button type="button" onClick={() => handleRemoveRule(index)} className="text-red-500 font-semibold material-symbols-outlined">delete_forever</button>
                  </div>
                ))}
                <button type="button" onClick={handleAddRule} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Add Rule</button>
              </div>
            ) : (
              <input type={key.includes('Date') ? 'date' : 'text'} id={key} name={key} value={value} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            )}
          </div>
        ))}
        {/* Submit button */}
        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Update Competition</button>
          <button onClick={()=>setEditingCompetition(null)} className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCompetition;
