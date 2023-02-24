import './UsersListPage.css'
import NavbarAdminAll from "../components/NavbarAdminAll";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBarUser from '../components/SearchBarUser';

const UsersListPage = () => {
  const [users, setUsers] = useState([])
  const [refresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, { headers })
      .then(response => {
        setUsers(response.data)
      }).catch(error => console.log(error))
  }, [refresh])

  return (
    <div className="UsersListPage">
      <NavbarAdminAll />
      <SearchBarUser />
      <h1 className="welcome-user-list">Current Users List</h1>
      <div className="users-list">
        <div className="createNewUser-btn">
          <Link to='/sign-up/user'>
            <button
              type="button"
              className="btn btn-primary createUser-btn">
              Create a New User
            </button>
          </Link>
        </div>
        {users.length > 0 && users.map(user => {
          return (
            <Link to={`/user/${user._id}`} className="link-user-details">
              <div key={user._id} className="user">
                <p><span className='user-detail'>Name:</span> {user.name} - 
                <span className='user-detail'>Employee Code:</span> {user.employeeCode} - <span className='user-detail'>User level:</span> {user.level} - <span className='user-detail'>Department:</span> {user.department}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default UsersListPage