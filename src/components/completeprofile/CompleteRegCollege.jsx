import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage, setMessageType, selectUserdata, setUserData } from '../../store';
import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseconfig/firebaseconfig';

export default function CollegeRegForm() {
  const dispatch = useDispatch();
  const initialData = useSelector(selectUserdata);
  const [formData, setFormData] = useState({
    collegeName: initialData.collegeName || '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || '',
    department: initialData.department || '',
    aboutCollege: initialData.aboutCollege || '',
    // Add more fields as needed
  });
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    setProfileCompleted(allFieldsFilled);
  }, [formData]);

  useEffect(() => {
    // Extract the specific values from initialData that you're interested in
    const { collegeName, email, phoneNumber, address, city, state, zipCode, country, department, aboutCollege } = initialData;

    // Check if any of the extracted values are different from the corresponding values in formData
    const hasChanged = (
      formData.collegeName !== collegeName ||
      formData.email !== email ||
      formData.phoneNumber !== phoneNumber ||
      formData.address !== address ||
      formData.city !== city ||
      formData.state !== state ||
      formData.zipCode !== zipCode ||
      formData.country !== country ||
      formData.department !== department ||
      formData.aboutCollege !== aboutCollege
      // Add more fields as needed
    );

    setIsDataChanged(hasChanged);
  }, [formData, initialData]);
  
  // Remaining code remains the same
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const collegeProfileRef = doc(collection(firestore, 'users'), initialData.email);
      await updateDoc(collegeProfileRef, formData);

      const updatedCollegeData = { ...initialData, ...formData };
      dispatch(setUserData(updatedCollegeData));

      await setDoc(collegeProfileRef, { profileCompleted }, { merge: true });

      console.log('Profile completion status updated in Firestore:', profileCompleted);
      console.log('Data updated successfully');
      dispatch(setMessageType('success'));
      dispatch(setMessage('Data updated successfully'));
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
      // Set error message
      dispatch(setMessage('Error updating data'));
      dispatch(setMessageType('error'));
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 p-4 rounded-lg shadow-md">
      {Object.keys(formData).map((key) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="text-gray-700 font-bold mb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <input
            type="text"
            name={key}
            id={key}
            value={formData[key]}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={!isDataChanged}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-center md:self-end ${!isDataChanged ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Submit
      </button>
    </form>
  );
}
