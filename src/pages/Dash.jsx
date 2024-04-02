import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserdata } from '../store';
import StudentDash from '../components/dashcomponent/StudentDash';
import CollegeDash from '../components/dashcomponent/CollegeDash';

export default function Dash() {
  const data = useSelector(selectUserdata);
  
  if (!data) {
    // Handle case when user data is not available yet
    return <div>Loading...</div>;
  }

  // Ensure data is available before accessing its properties
  const userType = data?.usertype;

  if (!userType) {
    // Handle case when usertype is not available
    return <div>User type not available</div>;
  }

  return (
    <>
      {userType === "student" && <StudentDash />}
      {userType === "college" && <CollegeDash />}
    </>
  );
}
