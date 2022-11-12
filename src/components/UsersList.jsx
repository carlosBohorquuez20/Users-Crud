import React from 'react';
import { set } from 'react-hook-form';

const UsersList = ({ usersList, selectUser, deleteProduct, modalStatus, setEdit }) => {
  return (
    <ul>
      {usersList.map(user => (
        <li key={user.id}>
          <div className='bot-line'>
            <h2 >{user.first_name} {user.last_name}</h2>
          </div>
          <div className='text-background'>
            <div className='line-text-1'>
              <p>Email: <br />{user.email}</p>
            </div>
            <div>
              <p>Birthday: <br /><i className="fa-solid fa-gift"></i> {user.birthday}</p>
            </div>
          </div>
          <div className='buttons'>
            <button className='delete' onClick={() => deleteProduct(user.id)}><i className="fa-solid fa-trash"></i></button>
            <button className='edit' onClick={() => {
              selectUser(user)
              modalStatus(true)
              setEdit("Edit")
            }
            }>
              <i className="fa-solid fa-pen-to-square"></i></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;