import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { app, firestore, storage,auth } from '../../firebaseconfig/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store';



export default function StudentRegistrationForm() {
  const history = useNavigate();
  const dispatch=useDispatch();
  // const auth = getAuth(app);
  const [formData, setFormData] = useState({
    studentName: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleImageUpload = async () => {
    if (formData.image) {
      const storageRef = ref(storage, `profileImages/${formData.studentName}`);
      await uploadBytes(storageRef, formData.image, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image and get download URL
      const imageURL = await handleImageUpload();

      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${formData.studentName}@example.com`,
        formData.password
      );

      // Update the user's profile with the student name and image URL
      await updateProfile(userCredential.user, {
        displayName: formData.studentName,
        photoURL: imageURL,
      });

      // Add user data to Firestore
      const userRef = collection(firestore, 'users');
      const docData = {
        uid: userCredential.user.uid,
        studentName: formData.studentName,
        imageURL,
        other:JSON.stringify(userCredential),
      };
      await addDoc(userRef, docData);
      dispatch(setUser(docData));
      // Redirect to the student's dashboard
      history('/student/dashboard');
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
      <label>
        Profile Image:
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
