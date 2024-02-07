import React from 'react';
import { useForm } from 'react-hook-form';

export default function ApplyForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Full Name:
        <input type="text" name="fullName" ref={register({ required: 'This field is required' })} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </label>

      {/* Add more form fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
}