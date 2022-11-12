import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const UsersForm = ({ getUsers, userSelect, deSelect, modalStatus, edit }) => {
  const { register, handleSubmit, reset } = useForm();

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: ""
  }

  useEffect(() => {
    if (userSelect) {
      reset(userSelect)

    } else {
      reset(initialValues)
    }
  }, [userSelect]);

  const submit = (data) => {
    console.log(data)
    if (userSelect) {
      axios
        .put(`https://users-crud1.herokuapp.com/users/${userSelect.id}/`, data)
        .then(() => {
          getUsers();
          deSelect();
          modalStatus(false);
        })
        .catch((error) => console.log(error.response?.data))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your information has been saved',
        showConfirmButton: false,
        background: '#DDBEA9',
        iconColor: 'green',
        timer: 1500
      })
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => {
          getUsers();
          deSelect();
          modalStatus(false);
        })
        .catch((error) => console.log(error.response?.data))

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your information has been saved',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }
  return (
    <form action="" onSubmit={handleSubmit(submit)}>
      <div className='top-modal'>
        <h3>{edit} User</h3>
        <div onClick={() => {
          modalStatus(false)
        }}><i className="fa-solid fa-xmark close-modal"></i></div>
      </div>
      <div className='form-container'>
        <div className='inputs-container'>
          <label htmlFor="first_name">First Name</label>
          <input {...register("first_name")} type="text" id='first_name' placeholder='First Name' required />
        </div>
        <div className='inputs-container'>
          <label htmlFor="last_name">Last Name</label>
          <input {...register("last_name")} type="text" id='last_name' placeholder='Last Name' required />
        </div>
        <div className='inputs-container'>
          <label htmlFor="email">Correo</label>
          <input {...register("email")} type="email" id='email' placeholder='Email' required />
        </div>
        <div className='inputs-container'>
          <label htmlFor="passwordl">Password</label>
          <input {...register("password")} type="password" id='password' placeholder='Password' required />
        </div>
        <div className='inputs-container'>
          <label htmlFor="birthday">Birthday</label>
          <input {...register("birthday")} type="date" id='birthday' required />
        </div>
        <button className='submit'>Submit</button>
      </div>
    </form>
  );
};
export default UsersForm;