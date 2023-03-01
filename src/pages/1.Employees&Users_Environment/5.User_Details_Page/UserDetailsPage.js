import './UserDetailsPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import Swal from 'sweetalert2'

const UserDetailsPage = props => {
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  const { userId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  // O delete foi removido porque ao invés de deletar os usuários são enviados para a pagina de ex
  // const deleteUser = (id) => {
  //   axios.delete(`${process.env.REACT_APP_API_URL}/user/${userId}`, { headers })
  //     .then(respponse => {
  //       setRefresh(!refresh)
  //       Swal.fire({
  //         text: 'User deleted successfully',
  //         imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397055/rogers_images/vamtaidwul4evlgjhn6p.jpg",
  //         imageWidth: 200,
  //         imageHeight: 200,
  //         imageAlt: 'Custom image',
  //       })
  //       navigate('/users')
  //     }).catch(error => console.log(error))
  // }

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
          <p><span className="user-info">Birthday: </span>{ user.dob }</p>
          <p><span className="user-info">Phone Number: </span>{ user.phoneNumber }</p>
          <p><span className="user-info">Started at: </span>{ user.startingDate }</p>
          <p><span className="user-info">Department: </span>{ user.department }</p>
          <p><span className="user-info">Current Position: </span>{ user.position }</p>
          <p><span className="user-info">Emergency Contact: </span>{ user.emergencyContact }</p>
          <p><span className="user-info">User level: </span>{ user.level }</p>
          <p><span className="user-info">Comments: </span>{ user.comments }</p>
        </div>
      </div>
      {/* <button
        type= "button"
        className="btn btn-danger delete-user-btn"
        id={loggedInUser.user.level !== "admin" ? "no-delete-btn" : "enable-delete-btn" }
        style={{width: "120px"}}
        onClick={() => deleteUser(user._id)}
        >Delete User
      </button> */}
      <Link to={'/employees'} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default UserDetailsPage