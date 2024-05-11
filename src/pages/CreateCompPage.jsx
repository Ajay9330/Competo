import React, { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, doc,arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebaseconfig/firebaseconfig'; // Firebase config
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, selectUserdata, setMessage, setMessageType } from '../store';

function CreateCompPage() {
  const userData=useSelector(selectUserdata);
  var collegeId = userData && userData.email ? userData.email.trim() : ''; // Trim and ensure non-empty
  const dispach=useDispatch();
  
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
    collegeId: collegeId,
    rules: [], // Initialize as an empty array
    contact: '',
    eligibility: '',
    collegeimg: '', // Initially empty
    compimg: null, // Initially null for file upload
    keywords: '', 
  });
  function resetformdata(){
    setFormData({
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
      collegeId: collegeId,
      rules: [], // Initialize as an empty array
      contact: '',
      eligibility: '',
      collegeimg: '', // Initially empty
      compimg: null, // Initially null for file upload
      keywords: '', 
    });
  }
  useEffect(() => {
    // Ensure `userData.email` is valid before setting `collegeId`
    if (userData && userData.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        collegeId: userData.email.trim(), // Ensure proper structure
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRulesChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRules = [...formData.rules];
    updatedRules[index] = value;
    setFormData({ ...formData, rules: updatedRules });
  };

  const addRule = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rules: [...prevFormData.rules, ''],
    }));
  };

  const deleteRule = (index) => {
    const updatedRules = [...formData.rules];
    updatedRules.splice(index, 1);
    setFormData({ ...formData, rules: updatedRules });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, compimg: files[0] });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let compImgUrl = '';

      if (formData.compimg) {
        const compImgRef = ref(storage, `compimg/${formData.title}`);
        await uploadBytes(compImgRef, formData.compimg);
        compImgUrl = await getDownloadURL(compImgRef); // Get download URL
      }

      const competitionData = {
        ...formData,
        compimg: compImgUrl, // Store image URL
      };

      const docRef = await addDoc(collection(firestore, 'competitions'), competitionData);
      const competitionId = docRef.id;

      await updateDoc(doc(firestore, 'users', formData.collegeId.trim()), {
        competitions: arrayUnion(competitionId),
      });
      dispach(setMessage('Competition created')); // Clear message
      dispach(setMessageType("sucess"));
      setTimeout(() => {
        dispach(clearMessage());
        resetformdata();
      }, 3000);
      console.log('Competition created successfully with image URL:', compImgUrl);
    } catch (error) {
      console.error('Error creating competition:', error);
    }
  };


  return (<>

    <div className='w-full'>
        <div className='flex flex-wrap justify-center bg-zinc-900 items-center'>
          <div>
            <img src={userData.photourl}/>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2 px-6 bg-white mt-6 p-2 rounded-full">Create Competition</h2>
            <label htmlFor="collegeId" className="block font-semibold mb-2 text-white">College ID: {formData.collegeId}</label>
          </div>
        </div>
        
              <div className="md:max-w-[90%]  w-full bg-green-600 bg-opacity-10 backdrop-blur-3xl mx-auto px-4 py-8  rounded-md shadow-xl m-10 mt-0 shadow-black">
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Location */}
              <div>
              <label htmlFor="location" className="block font-semibold mb-2">Location:</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block font-semibold mb-2">Duration:</label>
              <input type="text" name="duration" id="duration" value={formData.duration} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
          
            {/* Website input */}
            <div>
              <label htmlFor="website" className="block font-semibold mb-2">Competition Website:</label>
              <input type="text" name="website" id="website" value={formData.website} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
      

            <div>
              <label htmlFor="compimg" className="block font-semibold mb-2">
                Competition Image:
              </label>
              <input type="file" name="compimg" id="compimg" onChange={handleFileChange} />
            </div>

            {/* Form fields */}
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-semibold mb-2">Title:</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Start Registration Date */}
            <div>
              <label htmlFor="startRegistrationDate" className="block font-semibold mb-2">Start Registration Date:</label>
              <input type="date" id="startRegistrationDate" name="startRegistrationDate" value={formData.startRegistrationDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* End Registration Date */}
            <div>
              <label htmlFor="endRegistrationDate" className="block font-semibold mb-2">End Registration Date:</label>
              <input type="date" id="endRegistrationDate" name="endRegistrationDate" value={formData.endRegistrationDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Competition Date */}
            <div>
              <label htmlFor="competitionDate" className="block font-semibold mb-2">Competition Date:</label>
              <input type="date" id="competitionDate" name="competitionDate" value={formData.competitionDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Prize */}
            <div>
              <label htmlFor="prize" className="block font-semibold mb-2">Prize:</label>
              <input type="text" id="prize" name="prize" value={formData.prize} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block font-semibold mb-2">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md py-2 px-3 resize-none"></textarea>
            </div>
            {/* Organizer Team */}
            <div>
              <label htmlFor="organizerteam" className="block font-semibold mb-2">Organizer Team:</label>
              <input type="text" id="organizerteam" name="organizerteam" value={formData.organizerteam} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>

            {/* College ID
            <div>
              <input type="text" id="collegeId" name="collegeId" value={formData.collegeId} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div> */}
            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block font-semibold mb-2">Contact:</label>
              <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Eligibility */}
            <div>
              <label htmlFor="eligibility" className="block font-semibold mb-2">Eligibility:</label>
              <input type="text" id="eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Keywords */}
            <div>
              <label htmlFor="keywords" className="block font-semibold mb-2">Keywords:</label>
              <input type="text" id="keywords" name="keywords" value={formData.keywords} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
            </div>
            {/* Rules */}
            <div className="md:col-span-2">
              <label htmlFor="rules" className="block font-semibold mb-2">Rules:</label>
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input type="text" name="rules" value={rule} onChange={(e) => handleRulesChange(e, index)} className="border border-gray-300 rounded-md py-2 px-3 mr-2 w-full" />
                  <button type="button" onClick={() => deleteRule(index)} className="text-red-500 font-semibold material-symbols-outlined">delete_forever</button>
                </div>
              ))}
              <button type="button" onClick={addRule} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Add Rule</button>
            </div>
            {/* Submit button */}
            <div className="md:col-span-2">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Create Competition</button>
            </div>
          </form>
        </div>
    </div>

    
    </>
  );
}

export default CreateCompPage;