import './UserDetailsPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarAdminAll from '../components/NavbarAdminAll';

const UserDetailsPage = props => {
  const [user, setUser] = useState(null)

  const { userId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, { headers })
      .then(response => {
        setUser(response.data)
      }).catch(error => console.log(error))
  }, [])

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="UserDetailsPage">
      <NavbarAdminAll />
      <div className="h1-btn-user">
        <h1 style={{margin: "20px, 0"}}>{ user.name.split(' ')[0] }'s user details</h1>
        <Link to={`/user/edit/${user._id}`}>
          <button
            type="button"
            className="btn btn-primary edit-user-btn"
            style={{width: "170px"}}>Update User
          </button>
        </Link>
      </div>
      <div className="user-img">
        <img src={ user.imageUrl } style={{height: "150px"}} alt="User" />
        <div className="info-user">
          <p><span className="user-info">Name:</span> { user.name }</p>
          <p><span className="user-info">Employee Code: </span>{ user.employeeCode }</p>
          <p><span className="user-info">User level: </span>{ user.level }</p>
          <p><span className="user-info">Department: </span>{ user.department }</p>
          <p><span className="user-info">Comments: </span>{ user.comments }</p>
        </div>
      </div>
      
    </div>
  )
}

export default UserDetailsPage