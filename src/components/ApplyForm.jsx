import React from 'react';

export default function ApplyForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Full Name:
        <input type="text" name="fullName" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phoneNumber" required />
      </label>
      <label>
        Address:
        <input type="text" name="address" />
      </label>
      <label>
        City:
        <input type="text" name="city" />
      </label>
      <label>
        State:
        <input type="text" name="state" />
      </label>
      <label>
        Zip Code:
        <input type="text" name="zipCode" />
      </label>
      <label>
        Country:
        <input type="text" name="country" />
      </label>
      {/* Add more form fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
}
