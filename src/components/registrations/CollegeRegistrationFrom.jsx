import React from 'react';


export default function CollegeRegistrationForm() {


  const onSubmit = (data) => {
    // Handle form submission logic
    console.log(data);
  };

  return (
    <form >
      <label>
        College Name:
        <input type="text" name="collegeName"  />
      </label>
      <label>
        Password:
        <input type="password" name="password"  />
      </label>

      {/* Add more form fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
}