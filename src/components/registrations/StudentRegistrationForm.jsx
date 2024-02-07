import React, { useState } from 'react';
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {app} from '../../firebaseconfig/firebaseconfig';
const auth = getAuth(app);


onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
    alert(uid);
    // ...
  } else {
 
  }})
export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth,
        `${formData.studentName}@example.com`, // Use a unique email for each user
        formData.password
      );

      const user = userCredential.user;
      console.log('User registered successfully:', user);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student Name:
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      {/* Add more form fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
}
