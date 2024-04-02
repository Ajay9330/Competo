import React, { useState } from 'react';
import { collection, addDoc,doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../firebaseconfig/firebaseconfig'; // Import your Firebase configuration
import { selectUserdata } from '../store';
import { useSelector } from 'react-redux';
function CreateCompPage() {
    
  const [formData, setFormData] = useState({
    title: '',
    startRegistrationDate: '',
    endRegistrationDate: '',
    competitionDate: '',
    prize: '',
    description: '',
    postedBy: '', // Assuming this is the name of the college or organization posting the competition
    collegeId: useSelector(selectUserdata).uid, // ID of the college
    rules: [''], // Initialize rules array with one empty string
    contact: '',
    eligibility: '',
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRules = [...formData.rules];
    updatedRules[index] = value;
    setFormData({ ...formData, rules: updatedRules });
  };

  const addRule = () => {
    setFormData({ ...formData, rules: [...formData.rules, ''] });
  };

  const deleteRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData({ ...formData, rules: updatedRules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add competition data to Firestore
      const docRef = await addDoc(collection(firestore, 'competitions'), formData);
      const competitionId = docRef.id;
      
      // Update array of competitions for the college
      await updateDoc(doc(firestore, 'colleges', formData.collegeId), {
        competitions: arrayUnion(competitionId)
      });
      
      console.log('Competition added successfully!');
    } catch (error) {
      console.error('Error adding competition: ', error);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Competition</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="startRegistrationDate" className="block font-semibold mb-2">Start Registration Date:</label>
          <input type="date" id="startRegistrationDate" name="startRegistrationDate" value={formData.startRegistrationDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="endRegistrationDate" className="block font-semibold mb-2">End Registration Date:</label>
          <input type="date" id="endRegistrationDate" name="endRegistrationDate" value={formData.endRegistrationDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="competitionDate" className="block font-semibold mb-2">Competition Date:</label>
          <input type="date" id="competitionDate" name="competitionDate" value={formData.competitionDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="prize" className="block font-semibold mb-2">Prize:</label>
          <input type="text" id="prize" name="prize" value={formData.prize} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-2">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md py-2 px-3 resize-none"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="postedBy" className="block font-semibold mb-2">Posted By:</label>
          <input type="text" id="postedBy" name="postedBy" value={formData.postedBy} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="collegeId" className="block font-semibold mb-2">College ID:</label>
          <input type="text" id="collegeId" name="collegeId" value={formData.collegeId} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block font-semibold mb-2">Contact:</label>
          <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="eligibility" className="block font-semibold mb-2">Eligibility:</label>
          <input type="text" id="eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="rules" className="block font-semibold mb-2">Rules:</label>
          {formData.rules.map((rule, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" name="rules" value={rule} onChange={(e) => handleChange(e, index)} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
              <button type="button" onClick={() => deleteRule(index)} className="text-red-500 font-semibold">Delete</button>
            </div>
          ))}
          <button type="button" onClick={addRule} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Add Rule</button>
        </div>
        {/* Add other input fields for competition details */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Create Competition</button>
      </form>
    </div>
  );
}

export default CreateCompPage;
