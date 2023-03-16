import './UserDetailsPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import Swal from 'sweetalert2'

const UserDetailsPage = props => {
  const [user, setUser] = useState(null)
  const [refresh] = useState(true)


  const { userId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = (text) => {
      Swal.fire({
      text,
      imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396949/rogers_images/lfn5fdhvz3tcezcagj1s.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
    })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, { headers })
      .then(response => {
        setUser(response.data)
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }, [refresh])

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
            id={user.currentStatus === true || loggedInUser.user.level !== "admin" ? "no-btn" : "enable-btn"}
            className="btn btn-primary edit-user-btn"
            style={{width: "170px"}}>Update
          </button>
        </Link>
      </div>
      <div className="user-img">
        <img src={ user.imageUrl } style={{height: "150px", borderRadius: "5px", marginTop: "8px"}} alt="User" />
        <div className="info-user">
          <p><span className="user-info">Name:</span> { user.name }</p>
          <p><span className="user-info">Employee Code: </span>{ user.employeeCode }</p>
          <p><span className="user-info">Department: </span>{ user.department }</p>
          <p><span className="user-info">Current Position: </span>{ user.position }</p>
          { user.fulltime === true ?  <p><b>Shift Type:</b> Full-time</p> : <p> <b>Shift Type:</b> Part-time</p> }
          <p><span className="user-info">Started at: </span>{ user.startingDate }</p>
          <p><span className="user-info">Birthday: </span>{ user.dob }</p>
          <p><span className="user-info">Phone Number: </span>{ user.phoneNumber }</p>
          <p><span className="user-info">Emergency Contact: </span>{ user.emergencyContact }</p>
          <p><span className="user-info">User level: </span>{ user.level }</p>
          <p><span className="user-info">Comments: </span>{ user.comments }</p>
        </div>
      </div>
      <Link to={'/employees'} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default UserDetailsPage