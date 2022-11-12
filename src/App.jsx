import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import UsersForm from './components/UsersForm';
import UsersList from './components/UsersList';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Footer from './components/Footer';
function App() {

  const [usersList, setUsersLists] = useState([]);
  const [userSelect, setUserSelect] = useState(null);
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState("")
  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsersLists(res.data))
  }, [])

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsersLists(res.data))
  }

  const selectUser = (user) => {
    setUserSelect(user)
  }
  const clearCamps = () => {
    setUserSelect(null)
  }
  const deSelect = () => {
    setUserSelect(null)
  }
  console.log(usersList)

  const deleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      background: '#DDBEA9',
      iconColor: 'red',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
          .then(() => getUsers())
          .catch(error => console.log(error.response.data))
        Swal.fire({
          background: '#DDBEA9',
          icon: 'success',
          title: 'Deleted!',
          text: "Your file has been deleted",
          text: "success",
          iconColor: 'green',
        }
        )
      }
    })
  }

  const modalStatus = (a) => {
    setModal(a)
  }
  
  return (
    <div className="App">
      <div className='top-users'>
        <h1>Users</h1>
        <div className='button-new-user' onClick={() => {
          modalStatus(true)
          clearCamps()
          setEdit("New")
        }}><i className="fa-solid fa-plus circle-plus"></i></div>
      </div>
      <div className={`${modal ? "modal-active" : "modal-desactive"}`}>
        <UsersForm getUsers={getUsers} userSelect={userSelect} deSelect={deSelect} modalStatus={modalStatus} edit={edit} />
      </div>
      <div>
        <UsersList usersList={usersList} selectUser={selectUser} deleteProduct={deleteProduct} modalStatus={modalStatus} setEdit={setEdit} />
      </div>
      <Footer />
    </div>
  )
}

export default App
