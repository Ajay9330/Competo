import React from 'react';
import { useParams } from 'react-router-dom';

export default function ConditionalInfo({ usertype, studentData, collegeData }) {
  const { id } = useParams(); // Destructure ID from useParams

  return (
    <div className="container mx-auto px-4 py-8">
      {usertype === 'student' && studentData?.profileCompleted && (
        <div>
          <div className="flex items-center w-full rounded-full mb-8 border-[2px] border-blue-200">
            <div className="rounded-full h-20 w-20 object-fill border-2 bg-blue-100">
              <img className="h-full w-full" src={studentData.image} alt="Student" />
            </div>
            <p className="bg-blue-50 rounded-sm rounded-r-full h-fit p-2 font-black text-center flex-1 mx-5 text-4xl sm:text-5xl text-[#005FC5]">
              {studentData.fullName}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h3 className="text-4xl font-bold text-blue-900 rounded-sm pt-6">Student Information</h3>
            <div className="bg-white shadow-md rounded-lg overflow-hidden bg-gradient-to-br to-zinc-200 from-white">
              <div className="p-6 grid md:grid-cols-2 gap-3">
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">College Name:</span> {studentData.collegeName}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Email:</span> {studentData.email}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Phone Number:</span> {studentData.phoneNumber}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Address:</span> {studentData.address}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">City:</span> {studentData.city}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">State:</span> {studentData.state}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Zip Code:</span> {studentData.zipCode}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Country:</span> {studentData.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {usertype === 'college' && collegeData?.profileCompleted && (
        <div>
          <div className="flex items-center w-full rounded-full mb-8 border-[2px] border-blue-200">
            <div className="rounded-full min-h-20 min-w-20 object-cover border-2 bg-blue-100">
              <p>Logo</p>
            </div>
            <p
              className="bg-blue-50 rounded-sm rounded-r-full h-fit p-2 font-black text-center flex-1 mx-5 text-4xl sm:text-5xl text-[#005FC5]"
            >
              {collegeData.CollegeName}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h3 className="text-4xl font-bold text-blue-900 rounded-sm pt-6">College Information</h3>
            <div className="bg-white shadow-md rounded-lg overflow-hidden bg-gradient-to-br to-zinc-200 from-white">
              <div className="p-6 grid md:grid-cols-2 gap-3">
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Email:</span> {collegeData.email}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span className="md:text-xl font-bold text-zinc-800">Phone Number:</span> {collegeData.phoneNumber}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span class="md:text-xl font-bold text-zinc-800">Address:</span> {collegeData.address}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span class="md:text-xl font-bold text-zinc-800">City:</span> {collegeData.city}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span class="md:text-xl font-bold text-zinc-800">State:</span> {collegeData.state}
                </p>
                <p className="border-2 border-blue-400 bg-blue-200 rounded-lg px-4 py-2">
                  <span class="md:text-xl font-bold text-zinc-800">Zip Code:</span> {collegeData.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
