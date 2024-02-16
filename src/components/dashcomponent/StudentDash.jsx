import React from 'react'

export default function StudentDash() {
  return (
    <div>StudentDash</div>
  )
}
import React, { useEffect, useState } from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
import { setUser,selectUser } from '../../store';




export default function StudentRegistrationForm() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      history('/dashboard');
    }
  }, [user, history]);
  const [formData, setFormData] = useState({
    dob:'',
    usertype: 'student',
    firstName: '',
    lastName: '',
    collegeName: '',
    location: '',
    courseName: '',
    courseYear: '',
    skills: [],
    interest: '',
    email: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(e.target.src);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleImageUpload = async () => {
    if (formData.image) {
      const storageRef = ref(storage, `profileImages/${formData.email}`);
      await uploadBytes(storageRef, formData.image, 'data_url');
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   
      const imageURL = await handleImageUpload();

     
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: imageURL,
        usertype:formData.usertype,
      });


      const userRef = collection(firestore, 'users');
      const docData = {
        uid: userCredential.user.uid,
        ...formData,
        other: {...userCredential},
      };
      await addDoc(userRef, docData);
      dispatch(setUser(docData));
      history('/student/dashboard');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div className=''>
      <img className='h-40 mx-auto rounded-full w-40' src={formData.image?URL.createObjectURL(formData.image):""} alt="" />
 <form className='flex flex-wrap border-2 bg-blue-600 p-10 gap-5' onSubmit={handleSubmit}>
            <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
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

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        College Name:
        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Course Name:
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
        />
      </label>
      <label>
        Course Year:
        <input
          type="text"
          name="courseYear"
          value={formData.courseYear}
          onChange={handleChange}
        />
      </label>
      <label>
        Skills:
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
      </label>
      <label>
        Interest:
        <input
          type="text"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    </div>
   
  );
}