import React from 'react';

export default function CompCard({ competition }) {
  return (
    <div>
      <h3>{competition.title}</h3>
      <p>{competition.description}</p>
      {/* Add more details or actions as needed */}
    </div>
  );
}