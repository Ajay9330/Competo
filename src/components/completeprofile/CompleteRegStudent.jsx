import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserdata, setUserData } from '../../store';
import { collection, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseconfig/firebaseconfig';

export default function CompleteRegStudent() {
  const dispatch = useDispatch();
  const initialData = useSelector(selectUserdata);

  const [formData, setFormData] = useState({
    fullName: initialData.firstName || '',
    email: initialData.email || '',
    phoneNumber: initialData.phoneNumber || '',
    address: initialData.address || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || '',
  });

  const [profileCompleted, setProfileCompleted] = useState(false);

  // useEffect to update profile completion status based on form data
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
    setProfileCompleted(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update data in Firestore
      const userProfileRef = doc(collection(firestore, 'users'), initialData.email);
      await updateDoc(userProfileRef, formData);

      // Merge existing user data with new form data
      const updatedUserData = { ...initialData, ...formData };
      dispatch(setUserData(updatedUserData));

      // Store profile completion status in Firestore
      await setDoc(userProfileRef, { profileCompleted }, { merge: true });

      console.log('Profile completion status updated in Firestore:', profileCompleted);
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {Object.keys(formData).map((key) => (
        <label key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:
          <input
            type="text"
            name={key}
            value={formData[key]} // Use value instead of defaultValue
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
