import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser,selectUserdata } from './../../store';
import CollegeRegForm from '../completeprofile/CompleteRegCollege';

export default function StudentDash() {
  const collegeData = useSelector(selectUserdata);

  return (
    <>
      {collegeData?.profileCompleted &&   
      <div className="container mx-auto px-4 py-8">
        logo
      <p className="font-semibold w-full text-center text-5xl"> {collegeData.collegeName}</p>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">College Information</h3>
              <p><span className="font-semibold">Email:</span> {collegeData.email}</p>
              <p><span className="font-semibold">Phone Number:</span> {collegeData.phoneNumber}</p>
              <p><span className="font-semibold">Address:</span> {collegeData.address}</p>
              <p><span className="font-semibold">City:</span> {collegeData.city}</p>
              <p><span className="font-semibold">State:</span> {collegeData.state}</p>
              <p><span className="font-semibold">Zip Code:</span> {collegeData.zipCode}</p>
              <p><span className="font-semibold">Country:</span> {collegeData.country}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Department Information</h3>
              <p><span className="font-semibold">Department:</span> {collegeData.department}</p>
              <p><span className="font-semibold">About College:</span> {collegeData.aboutCollege}</p>
              {/* Add more department-related information here */}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
      {!collegeData?.profileCompleted && <CollegeRegForm />}
    </>
  );
}
